"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function useZipSelection(onSuccess?: (zip: string) => void) {
    const searchParams = useSearchParams();
    const [zipCode, setZipCode] = useState(searchParams.get("zip") || "");
    const [isChecking, setIsChecking] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Sync with URL changes (e.g. if someone else updates the ZIP in the URL)
    useEffect(() => {
        const zip = searchParams.get("zip");
        if (zip && zip !== zipCode) {
            setZipCode(zip);
        }
    }, [searchParams, zipCode]);

    const handleZipChange = useCallback((value: string) => {
        setError(null);
        const cleaned = value.replace(/\D/g, "").slice(0, 5);
        setZipCode(cleaned);
        
        // Update URL partially to "broadcast" it to other components on the page
        // without a full page refresh
        const url = new URL(window.location.href);
        if (cleaned.length === 5) {
            url.searchParams.set("zip", cleaned);
        } else {
            url.searchParams.delete("zip");
        }
        window.history.replaceState({}, "", url.toString());
    }, []);

    const validateAndProceed = useCallback(async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        
        if (zipCode.length !== 5) {
            setError("Please enter a valid 5-digit zip code");
            return;
        }

        setIsChecking(true);
        setError(null);

        try {
            const { checkZipAvailability } = await import("@/app/actions/location");
            const res = await checkZipAvailability(zipCode);

            if (res.status === "unavailable") {
                setError("Sorry, we don't service this area yet.");
                return;
            }

            if (onSuccess) {
                onSuccess(zipCode);
            }
        } catch (err) {
            console.error("ZIP check failed:", err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsChecking(false);
        }
    }, [zipCode, onSuccess]);

    return {
        zipCode,
        isChecking,
        error,
        handleZipChange,
        validateAndProceed,
        setError
    };
}
