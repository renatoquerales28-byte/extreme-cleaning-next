"use server";

import { db } from "@/lib/db";
import { promotions } from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";

export type ValidatePromoResult = {
    success: boolean;
    message?: string;
    discount?: {
        type: "percent" | "fixed";
        value: number;
        code: string;
    };
};

export async function validatePromoCode(code: string): Promise<ValidatePromoResult> {
    if (!code) {
        return { success: false, message: "Please enter a code." };
    }

    try {
        const normalizedCode = code.trim().toUpperCase();

        const promo = await db.query.promotions.findFirst({
            where: eq(promotions.code, normalizedCode),
        });

        if (!promo) {
            return { success: false, message: "Invalid promo code." };
        }

        if (!promo.active) {
            return { success: false, message: "This promo code is no longer active." };
        }

        // Check usage limits
        if (promo.currentUses >= promo.maxUses) {
            return { success: false, message: "This promo code has reached its usage limit." };
        }

        // Check expiration
        if (promo.expiresAt && new Date() > promo.expiresAt) {
            return { success: false, message: "This promo code has expired." };
        }

        return {
            success: true,
            discount: {
                type: promo.discountType as "percent" | "fixed",
                value: promo.discountValue,
                code: promo.code,
            },
        };
    } catch (error) {
        console.error("Error validating promo code:", error);
        return { success: false, message: "Something went wrong. Please try again." };
    }
}

export async function generateOneTimePromo(
    discountValue: number,
    discountType: "percent" | "fixed" = "fixed",
    prefix: string = "GIFT"
): Promise<{ success: boolean; code?: string; message?: string }> {
    try {
        const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
        const code = `${prefix}-${randomSuffix}`;

        // Expires in 48 hours
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 48);

        await db.insert(promotions).values({
            code,
            discountType,
            discountValue,
            active: true,
            maxUses: 1,
            currentUses: 0,
            expiresAt
        });

        return { success: true, code };
    } catch (error) {
        console.error("Error generating promo:", error);
        return { success: false, message: "Failed to generate code." };
    }
}

export async function redeemPromoCode(code: string) {
    try {
        const normalizedCode = code.trim().toUpperCase();
        await db
            .update(promotions)
            .set({
                currentUses: sql`${promotions.currentUses} + 1`,
            })
            .where(eq(promotions.code, normalizedCode));
        return { success: true };
    } catch (error) {
        console.error("Error redeeming promo:", error);
        return { success: false };
    }
}
