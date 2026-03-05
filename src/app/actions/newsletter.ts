"use server";

import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/lib/db/schema";
import { Resend } from "resend";

const SENDER_EMAIL = process.env.SENDER_EMAIL || "no-reply@extremecleaning509.com";

export async function subscribeToNewsletter(formData: FormData) {
    try {
        const email = formData.get("email")?.toString();

        if (!email) {
            return { success: false, error: "Email is required" };
        }

        // 1. Save to DB
        try {
            await db.insert(newsletterSubscribers).values({
                email,
                city: "Spokane",
                source: "footer"
            });
        } catch (dbError: any) {
            // Handle unique constraint violation (already subscribed)
            if (dbError.code === "23505" || dbError.message?.includes("unique")) {
                return { success: false, error: "This email is already subscribed!" };
            }
            throw dbError; // rethrow if it's another error
        }

        // 2. Send welcome email via Resend
        if (!process.env.RESEND_API_KEY) {
            console.warn("⚠️ RESEND_API_KEY no configurada - Welcome email omitido");
            return {
                success: true,
                message: "Subscribed successfully (email skipped - no API key)"
            };
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        const emailPromise = resend.emails.send({
            from: `Extreme Cleaning Services <${SENDER_EMAIL}>`,
            to: [email],
            subject: "Welcome to Extreme Cleaning Services!",
            html: `
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
                    
                    <!-- Header -->
                    <div style="background: #024653; padding: 28px 32px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">Welcome! 🎉</h1>
                        <p style="margin: 8px 0 0; color: #a7d9e0; font-size: 15px;">Thanks for subscribing to our Spokane exclusive offers.</p>
                    </div>

                    <!-- Body -->
                    <div style="padding: 32px;">
                        <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                            Hi there,
                        </p>
                        <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                            We're thrilled to have you! You're now on the VIP list to receive our special offers, seasonal discounts, and cleaning tips exclusively for the Spokane community.
                        </p>
                        <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                            As a premium cleaning service, we're dedicated to bringing you the best value and the cleanest spaces possible.
                        </p>

                        <!-- CTA -->
                        <div style="text-align: center; margin-top: 30px; margin-bottom: 10px;">
                            <a href="https://extreme-cleaning-next.vercel.app/#services" 
                               style="display: inline-block; background: #085560; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 8px;">
                                Explore Our Services
                            </a>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="background: #f9fafb; padding: 24px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 0; color: #9ca3af; font-size: 13px;">© ${new Date().getFullYear()} Premium Cleaning Solutions.</p>
                        <p style="margin: 4px 0 0; color: #9ca3af; font-size: 13px;">Spokane, WA</p>
                    </div>

                </div>
            `,
        });

        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Email timeout")), 5000)
        );

        const { error } = await Promise.race([emailPromise, timeoutPromise]) as any;

        if (error) {
            console.error("❌ Error enviando welcome email:", error);
            // Even if email fails, DB insert succeeded so we return true but note the failure
            return { success: true, emailFailed: true, error: error.message };
        }

        return { success: true };

    } catch (err: any) {
        console.error("❌ Error en subscribeToNewsletter:", err.message);
        return {
            success: false,
            error: "Something went wrong. Please try again later."
        };
    }
}
