import React from 'react';
import { WizardData } from '../schemas/wizard';

// Import all step components
import ZipStep from '@/components/wizard/steps/ZipStep';
import ServiceStep from '@/components/wizard/steps/ServiceStep';
import CleaningTypeStep from '@/components/wizard/steps/CleaningTypeStep';
import PropertyAndExtrasStep from '@/components/wizard/steps/PropertyAndExtrasStep';
import CommercialStep from '@/components/wizard/steps/CommercialStep';
import ContactStep from '@/components/wizard/steps/ContactStep';
import SuccessStep from '@/components/wizard/steps/SuccessStep';

export type StepId =
    | 'zip'
    | 'service'
    | 'cleaning_type'
    | 'property_and_extras'
    | 'commercial_details'
    | 'contact'
    | 'success';

export interface WizardStepConfig {
    id: StepId;
    component: React.ComponentType<any>;
    title: string;
    accent: string;
    description: string;
    stage: number; // 1 to 5 for progress tracking
    next: (data: WizardData) => StepId | null;
    validationFields?: (keyof WizardData)[];
    onComplete?: (data: WizardData, helpers: { setValue: any, getValues: any }) => Promise<boolean>;
    guard?: (data: WizardData) => boolean;
    safeFallback?: StepId;
    isSpecial?: boolean;
}

import { toast } from "sonner";

export const WIZARD_FLOW: Record<StepId, WizardStepConfig> = {
    zip: {
        id: 'zip',
        component: ZipStep,
        title: "Where is the",
        accent: "Sparkle Needed?",
        description: "Enter your zip code to check availability in the Spokane area.",
        stage: 1,
        validationFields: ["zipCode"],
        onComplete: async (data) => {
            try {
                const { checkZipAvailability } = await import("@/app/actions/location");
                const res = await checkZipAvailability(data.zipCode);
                if (res.status === 'unavailable') {
                    toast.error("Sorry, we don't service this area yet.");
                    return false;
                }
                return true;
            } catch (error) {
                console.error("ZIP check failed:", error);
                return true; 
            }
        },
        next: (data) => {
            if (data.serviceType) return 'cleaning_type';
            return 'service';
        },
    },
    service: {
        id: 'service',
        component: ServiceStep,
        title: "Choose Your",
        accent: "Profile.",
        description: "Select the type of space we'll be transforming today.",
        stage: 2,
        validationFields: ["serviceType"],
        next: (data) => {
            if (data.cleaningType && data.cleaningType !== 'regular') {
                if (data.serviceType === 'commercial') return 'commercial_details';
                return 'property_and_extras';
            }
            return 'cleaning_type';
        },
    },
    cleaning_type: {
        id: 'cleaning_type',
        component: CleaningTypeStep,
        title: "Select Your",
        accent: "Protocol.",
        description: "Choose the type of cleaning service you require.",
        stage: 3,
        validationFields: ["cleaningType"],
        next: (data) => {
            if (data.serviceType === 'commercial') return 'commercial_details';
            return 'property_and_extras';
        },
    },
    property_and_extras: {
        id: 'property_and_extras',
        component: PropertyAndExtrasStep,
        title: "Specify",
        accent: "Your Space.",
        description: "Configure your property details and add premium extras.",
        stage: 4,
        validationFields: ["bedrooms", "bathrooms", "sqFt", "frequency"],
        next: (data) => {
            return 'contact';
        },
        guard: (data) => !!data.cleaningType,
        safeFallback: 'cleaning_type'
    },
    commercial_details: {
        id: 'commercial_details',
        component: CommercialStep,
        title: "Commercial",
        accent: "Specs.",
        description: "Tell us about your facility size.",
        stage: 4,
        validationFields: ["businessType", "commSqFt", "floors", "frequency"],
        next: () => 'contact',
    },
    contact: {
        id: 'contact',
        component: ContactStep,
        title: "Contact",
        accent: "& Address.",
        description: "Tell us who you are and where the property is located.",
        stage: 5,
        validationFields: ["firstName", "lastName", "email", "phone", "address", "city"],
        onComplete: async (freshData, { setValue, getValues }) => {
            try {
                const { createLead, updateLead } = await import("@/app/actions/admin");
                const leadId = getValues("leadId");

                const leadData = {
                    firstName: freshData.firstName,
                    lastName: freshData.lastName,
                    email: freshData.email,
                    phone: freshData.phone,
                    serviceType: freshData.serviceType,
                    frequency: freshData.frequency,
                    totalPrice: 0, 
                    status: "new",
                    details: freshData,
                };

                const res = leadId
                    ? await updateLead(Number(leadId), leadData)
                    : await createLead(leadData);

                if (res.success && (res as any).leadId) {
                    setValue("leadId", (res as any).leadId);
                }
                return true;
            } catch (error) {
                console.error("Lead sync error:", error);
                return true; 
            }
        },
        next: () => 'success',
    },
    success: {
        id: 'success',
        component: SuccessStep,
        title: "All",
        accent: "Set!",
        description: "Your request has been received.",
        stage: 6,
        next: () => null,
        isSpecial: true
    },
};

export const INITIAL_STEP: StepId = 'zip';
