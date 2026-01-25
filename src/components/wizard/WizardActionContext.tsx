import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WizardActionConfig {
    label: string;
    disabled?: boolean;
    onClick: () => void;
    isLoading?: boolean;
    loadingLabel?: string;
    secondaryContent?: ReactNode; // For links or extra info above the button
    icon?: ReactNode; // Optional custom icon, defaults to ArrowRight
    hide?: boolean; // In case a step wants no footer at all
    hideMainButton?: boolean; // If true, hides the teal button but keeps secondaryContent
}

interface WizardActionContextType {
    setAction: (config: WizardActionConfig) => void;
    action: WizardActionConfig | null;
}

const WizardActionContext = createContext<WizardActionContextType | undefined>(undefined);

export function WizardActionProvider({ children }: { children: ReactNode }) {
    const [action, setAction] = useState<WizardActionConfig | null>(null);

    return (
        <WizardActionContext.Provider value={{ action, setAction }}>
            {children}
        </WizardActionContext.Provider>
    );
}

export function useWizardAction() {
    const context = useContext(WizardActionContext);
    if (!context) {
        throw new Error("useWizardAction must be used within a WizardActionProvider");
    }
    return context;
}
