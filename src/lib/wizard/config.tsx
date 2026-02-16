import React from 'react';
import { WizardData } from '../schemas/wizard';

// Import all step components
import ZipStep from '@/components/wizard/steps/ZipStep';
import ServiceStep from '@/components/wizard/steps/ServiceStep';
import CleaningTypeStep from '@/components/wizard/steps/CleaningTypeStep';
import PropertyAndExtrasStep from '@/components/wizard/steps/PropertyAndExtrasStep';
import CommercialStep from '@/components/wizard/steps/CommercialStep';
import PMSelectionStep from '@/components/wizard/steps/PMSelectionStep';
import ContactStep from '@/components/wizard/steps/ContactStep';
import SuccessStep from '@/components/wizard/steps/SuccessStep';
import ReturningLookupStep from '@/components/wizard/steps/ReturningLookupStep';
import PropertySelectionStep from '@/components/wizard/steps/PropertySelectionStep';
import QuickConfigStep from '@/components/wizard/steps/QuickConfigStep';

export type StepId =
    | 'zip'
    | 'service'
    | 'cleaning_type'
    | 'property_and_extras'
    | 'commercial_details'
    | 'portfolio_summary'
    | 'contact'
    | 'success'
    | 'returning_lookup'
    | 'returning_select'
    | 'returning_config';

export interface WizardStepConfig {
    id: StepId;
    component: React.ComponentType<any>;
    title: string;
    accent: string;
    description: string;
    next: (data: WizardData) => StepId | null;
    guard?: (data: WizardData) => boolean;
    safeFallback?: StepId;
    isSpecial?: boolean;
}

export const WIZARD_FLOW: Record<StepId, WizardStepConfig> = {
    zip: {
        id: 'zip',
        component: ZipStep,
        title: "Where is the",
        accent: "Sparkle Needed?",
        description: "Enter your zip code to check availability in the Spokane area.",
        next: (data) => {
            if (data.mode === 'returning') return 'returning_lookup';
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
        next: (data) => {
            // AUTO-SKIP LOGIC: If cleaningType is already set (e.g. from landing), skip to the details
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
        next: (data) => {
            if (data.serviceType === 'property_mgmt') return 'portfolio_summary';
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
        next: () => 'contact',
    },
    portfolio_summary: {
        id: 'portfolio_summary',
        component: PMSelectionStep, // We will repurpose/replace this component
        title: "Portfolio",
        accent: "Summary.",
        description: "Review your properties and add more if needed.",
        next: () => 'contact',
    },
    contact: {
        id: 'contact',
        component: ContactStep,
        title: "Contact",
        accent: "& Address.",
        description: "Tell us who you are and where the property is located.",
        next: () => 'success',
    },
    success: {
        id: 'success',
        component: SuccessStep,
        title: "All",
        accent: "Set!",
        description: "Your request has been received.",
        next: () => null,
        isSpecial: true
    },

    // RETURNING FLOW
    returning_lookup: {
        id: 'returning_lookup',
        component: ReturningLookupStep,
        title: "Welcome",
        accent: "Back.",
        description: "Access your saved properties and preferences.",
        next: () => 'returning_select',
    },
    returning_select: {
        id: 'returning_select',
        component: PropertySelectionStep,
        title: "Glad you're",
        accent: "Here.",
        description: "Select which property needs care today.",
        next: () => 'returning_config',
    },
    returning_config: {
        id: 'returning_config',
        component: QuickConfigStep,
        title: "Almost",
        accent: "Done.",
        description: "Confirm your cleaning intensity and frequency.",
        next: () => 'contact',
    },
};

export const INITIAL_STEP: StepId = 'zip';

export const STEP_ORDER: StepId[] = [
    'zip', 'service', 'cleaning_type', 'property_and_extras', 'portfolio_summary', 'contact'
];
