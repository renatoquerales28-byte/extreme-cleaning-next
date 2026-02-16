import React from 'react';
import { WizardData } from '../schemas/wizard';

// Import all step components
import ZipStep from '@/components/wizard/v2/steps/ZipStep';
import ServiceStep from '@/components/wizard/v2/steps/ServiceStep';
import ResidentialStep from '@/components/wizard/v2/steps/ResidentialStep';
import CommercialStep from '@/components/wizard/v2/steps/CommercialStep';
import PMSelectionStep from '@/components/wizard/v2/steps/PMSelectionStep';
import ExtrasStep from '@/components/wizard/v2/steps/ExtrasStep';
import PriceAndQuoteStep from '@/components/wizard/v2/steps/PriceAndQuoteStep';
import LogisticsStep from '@/components/wizard/v2/steps/LogisticsStep';
import ReviewStep from '@/components/wizard/v2/steps/ReviewStep';
import SuccessStep from '@/components/wizard/v2/steps/SuccessStep';
import ReturningLookupStep from '@/components/wizard/v2/steps/ReturningLookupStep';
import PropertySelectionStep from '@/components/wizard/v2/steps/PropertySelectionStep';
import QuickConfigStep from '@/components/wizard/v2/steps/QuickConfigStep';

export type StepId =
    | 'zip'
    | 'service'
    | 'commercial_details'
    | 'pm_details'
    | 'space_config'
    | 'extras'
    | 'price_and_quote'
    | 'logistics'
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
            if (data.serviceType) {
                if (data.serviceType === 'commercial') return 'commercial_details';
                if (data.serviceType === 'property_mgmt') return 'pm_details';
                return 'space_config';
            }
            return 'service';
        },
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
            return 'space_config';
        },
        guard: (data) => !!data.zipCode,
        safeFallback: 'zip'
    },
    commercial_details: {
        id: 'commercial_details',
        component: CommercialStep,
        title: "Commercial",
        accent: "Specs.",
        description: "Tell us about your facility size.",
        next: () => 'price_and_quote',
    },
    pm_details: {
        id: 'pm_details',
        component: PMSelectionStep,
        title: "Property",
        accent: "Management.",
        description: "Volume pricing for pros.",
        next: () => 'price_and_quote',
    },
    space_config: {
        id: 'space_config',
        component: ResidentialStep, // Consolidated Residential Step
        title: "Your",
        accent: "Space.",
        description: "Configure your cleaning plan for a perfect match.",
        next: () => 'extras',
        guard: (data) => !!data.serviceType,
        safeFallback: 'service'
    },
    extras: {
        id: 'extras',
        component: ExtrasStep,
        title: "Want some",
        accent: "Extras?",
        description: "Add premium services to your cleaning plan.",
        next: () => 'price_and_quote',
    },
    price_and_quote: {
        id: 'price_and_quote',
        component: PriceAndQuoteStep, // Contact + Price Reveal
        title: "Unlock your",
        accent: "Quote.",
        description: "Enter your contact info to get your instant price.",
        next: () => 'logistics',
    },
    logistics: {
        id: 'logistics',
        component: LogisticsStep, // Date + Address
        title: "The",
        accent: "Setup.",
        description: "Select your preferred date and service address.",
        next: () => 'review',
    },
    review: {
        id: 'review',
        component: ReviewStep,
        title: "The",
        accent: "Finish.",
        description: "Review everything before confirming your booking.",
        next: () => 'success',
    },
    success: {
        id: 'success',
        component: SuccessStep,
        title: "All",
        accent: "Set!",
        description: "Your appointment has been confirmed.",
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
        next: () => 'price_and_quote',
    },
};

export const INITIAL_STEP: StepId = 'zip';

export const STEP_ORDER: StepId[] = [
    'zip', 'service', 'space_config', 'extras', 'price_and_quote', 'logistics', 'review'
];
