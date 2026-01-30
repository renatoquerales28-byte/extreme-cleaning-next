import React from 'react';
import { WizardData } from '../schemas/wizard';

// Import all step components
import ZipStep from '@/components/wizard/steps/ZipStep';
import ServiceStep from '@/components/wizard/steps/ServiceStep';
import CleaningTypeStep from '@/components/wizard/steps/CleaningTypeStep';
import ResidentialStep from '@/components/wizard/steps/ResidentialStep';
import CommercialStep from '@/components/wizard/steps/CommercialStep';
import PMSelectionStep from '@/components/wizard/steps/PMSelectionStep';
import FrequencyStep from '@/components/wizard/steps/FrequencyStep';
import QuoteStep from '@/components/wizard/steps/QuoteStep';
import PriceStep from '@/components/wizard/steps/PriceStep';
import DateStep from '@/components/wizard/steps/DateStep';
import AddressStep from '@/components/wizard/steps/AddressStep';
import ReviewStep from '@/components/wizard/steps/ReviewStep';
import SuccessStep from '@/components/wizard/steps/SuccessStep';
import ReturningLookupStep from '@/components/wizard/steps/ReturningLookupStep';
import PropertySelectionStep from '@/components/wizard/steps/PropertySelectionStep';
import QuickConfigStep from '@/components/wizard/steps/QuickConfigStep';

export type StepId =
    | 'zip'
    | 'service'
    | 'cleaning_type'
    | 'residential_details'
    | 'commercial_details'
    | 'pm_details'
    | 'frequency'
    | 'quote'
    | 'price'
    | 'date'
    | 'address'
    | 'review'
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
    /**
     * Determines the next step ID based on current data.
     * Can return null if this is a terminal step.
     */
    next: (data: WizardData) => StepId | null;
    /**
     * Optional guard function. If it returns false, the wizard will redirect to safeFallback.
     */
    guard?: (data: WizardData) => boolean;
    safeFallback?: StepId;
    /**
     * If true, this step is transient or special (like Success) and might not be counted in progress normal
     */
    isSpecial?: boolean;
}

export const WIZARD_FLOW: Record<StepId, WizardStepConfig> = {
    zip: {
        id: 'zip',
        component: ZipStep,
        title: "Where is the",
        accent: "Sparkle Needed?",
        description: "Enter your zip code to check availability in the Spokane area.",
        next: (data) => data.mode === 'returning' ? 'returning_lookup' : 'service',
    },
    service: {
        id: 'service',
        component: ServiceStep,
        title: "Choose Your",
        accent: "Service.",
        description: "Select the type of space we'll be transforming today.",
        next: (data) => {
            if (data.serviceType === 'commercial') return 'commercial_details';
            if (data.serviceType === 'property_mgmt') return 'pm_details';
            return 'cleaning_type'; // Residential default
        },
        guard: (data) => !!data.zipCode, // Must have zip
        safeFallback: 'zip'
    },
    cleaning_type: {
        id: 'cleaning_type',
        component: CleaningTypeStep,
        title: "Select",
        accent: "Intensity.",
        description: "From a quick refresh to a deep scrub.",
        next: () => 'residential_details',
        guard: (data) => data.serviceType === 'residential',
        safeFallback: 'service'
    },
    residential_details: {
        id: 'residential_details',
        component: ResidentialStep,
        title: "Tell us about",
        accent: "Your Space.",
        description: "Customize your cleaning plan for a perfect fit.",
        next: () => 'frequency',
        guard: (data) => data.serviceType === 'residential',
        safeFallback: 'service'
    },
    commercial_details: {
        id: 'commercial_details',
        component: CommercialStep,
        title: "Commercial",
        accent: "Specs.",
        description: "Tell us about your facility size.",
        next: () => 'frequency',
        guard: (data) => data.serviceType === 'commercial',
        safeFallback: 'service'
    },
    pm_details: {
        id: 'pm_details',
        component: PMSelectionStep,
        title: "Property",
        accent: "Management.",
        description: "Volume pricing for pros.",
        next: () => 'frequency',
        guard: (data) => data.serviceType === 'property_mgmt',
        safeFallback: 'service'
    },
    frequency: {
        id: 'frequency',
        component: FrequencyStep,
        title: "Select",
        accent: "Frequency.",
        description: "Save up to 20% with our recurring care plans.",
        next: () => 'quote',
    },
    quote: {
        id: 'quote',
        component: QuoteStep,
        title: "Unlock your",
        accent: "Quote.",
        description: "Enter your details to view your instant price.",
        next: () => 'price',
    },
    price: {
        id: 'price',
        component: PriceStep,
        title: "Your Final",
        accent: "Estimate.",
        description: "Premium Care, Guaranteed Quality. No hidden fees.",
        next: () => 'date',
    },
    date: {
        id: 'date',
        component: DateStep,
        title: "When should",
        accent: "we Clean?",
        description: "Select your preferred date and time for the service.",
        next: () => 'address',
    },
    address: {
        id: 'address',
        component: AddressStep,
        title: "Location",
        accent: "Details.",
        description: "Finalize your cleaning schedule and secure your slot.",
        next: () => 'review',
    },
    review: {
        id: 'review',
        component: ReviewStep,
        title: "Almost",
        accent: "Done.",
        description: "Please review your details before confirming.",
        next: () => 'success',
    },
    success: {
        id: 'success',
        component: SuccessStep,
        title: "All",
        accent: "Set!",
        description: "Your appointment has been confirmed.",
        next: () => null, // Terminal
        isSpecial: true
    },

    // RETURNING CUSTOMER FLOW
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
        next: (data) => {
            // Logic injected from original component: if ID=0, new property -> residential flow
            // We need to handle this dynamic jump. For now default to config.
            // The component actually handles the state and calls next(), but the engine 
            // needs to know WHERE next() goes. 
            // Ideally the component sets a flag in data like 'isNewProperty'
            return 'returning_config';
        },
    },
    returning_config: {
        id: 'returning_config',
        component: QuickConfigStep,
        title: "Almost",
        accent: "Done.",
        description: "Confirm your cleaning intensity and frequency.",
        next: () => 'quote', // Joins main flow at Quote
    },
};

export const INITIAL_STEP: StepId = 'zip';

// Helper to get linear index for progress bar (approximate for linear steps)
export const STEP_ORDER: StepId[] = [
    'zip', 'service', 'cleaning_type', 'residential_details',
    'frequency', 'quote', 'price', 'date', 'address', 'review', 'success'
];
