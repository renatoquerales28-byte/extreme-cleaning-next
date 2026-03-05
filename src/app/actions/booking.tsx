"use server";

import { Resend } from "resend";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "extremecleaning.ops@gmail.com";

export async function submitBooking(formData: any) {
    try {
        console.log("📩 Iniciando proceso de reserva para:", formData.email);

        // Si no hay API key, retornar sin intentar enviar
        if (!process.env.RESEND_API_KEY) {
            console.warn("⚠️ RESEND_API_KEY no configurada - Email omitido");
            return {
                success: true,
                skipped: true,
                message: "Booking saved (email skipped - no API key)"
            };
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        // Notificación interna al admin
        const emailPromise = resend.emails.send({
            from: "ECS Bookings <onboarding@resend.dev>",
            to: [ADMIN_EMAIL],
            subject: `🧹 New Booking — ${formData.firstName} ${formData.lastName}`,
            html: `
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
                    
                    <!-- Header -->
                    <div style="background: #024653; padding: 28px 32px;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">🧹 New Booking Received</h1>
                        <p style="margin: 6px 0 0; color: #a7d9e0; font-size: 14px;">Extreme Cleaning Services — Admin Notification</p>
                    </div>

                    <!-- Body -->
                    <div style="padding: 28px 32px;">

                        <!-- Client Info -->
                        <h2 style="color: #024653; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">👤 Client Info</h2>
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 10px 0; color: #6b7280; font-size: 14px; width: 40%;">Name</td>
                                <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: 600;">${formData.firstName} ${formData.lastName}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Email</td>
                                <td style="padding: 10px 0; color: #024653; font-size: 14px; font-weight: 600;"><a href="mailto:${formData.email}" style="color: #024653;">${formData.email}</a></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Phone</td>
                                <td style="padding: 10px 0; color: #111827; font-size: 14px;">${formData.phone || "N/A"}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">ZIP Code</td>
                                <td style="padding: 10px 0; color: #111827; font-size: 14px;">${formData.zipCode || "N/A"}</td>
                            </tr>
                        </table>

                        <!-- Service Details -->
                        <h2 style="color: #024653; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">🗓️ Service Details</h2>
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 10px 0; color: #6b7280; font-size: 14px; width: 40%;">Service Type</td>
                                <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: 600;">${formData.serviceType || "N/A"}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Date</td>
                                <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: 600;">${formData.serviceDate || "N/A"}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Time</td>
                                <td style="padding: 10px 0; color: #111827; font-size: 14px;">${formData.serviceTime || "N/A"}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Frequency</td>
                                <td style="padding: 10px 0; color: #111827; font-size: 14px;">${formData.frequency || "N/A"}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Address</td>
                                <td style="padding: 10px 0; color: #111827; font-size: 14px;">${formData.address || "N/A"}</td>
                            </tr>
                        </table>

                        <!-- Pricing -->
                        ${formData.estimatedPrice ? `
                        <div style="background: #ecfdf5; border: 1px solid #6ee7b7; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;">
                            <p style="margin: 0; color: #065f46; font-size: 16px; font-weight: 700;">💰 Estimated Price: $${formData.estimatedPrice}</p>
                        </div>
                        ` : ""}

                        <!-- Notes -->
                        ${formData.notes ? `
                        <h2 style="color: #024653; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">📝 Notes</h2>
                        <p style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px 16px; color: #374151; font-size: 14px; margin: 0 0 24px;">${formData.notes}</p>
                        ` : ""}

                        <!-- CTA -->
                        <div style="text-align: center; margin-top: 8px;">
                            <a href="https://extreme-cleaning-next.vercel.app/admin" 
                               style="display: inline-block; background: #024653; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 8px;">
                                View in Admin Dashboard →
                            </a>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="background: #f3f4f6; padding: 16px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 0; color: #9ca3af; font-size: 12px;">Extreme Cleaning Services — Internal Notification System</p>
                    </div>

                </div>
            `,
        });

        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Email timeout")), 5000)
        );

        const { data, error } = await Promise.race([emailPromise, timeoutPromise]) as any;

        if (error) {
            console.error("❌ Error enviando email al admin:", error);
            return { success: true, emailFailed: true, error: error.message };
        }

        console.log("✅ Notificación enviada al admin:", data);
        return { success: true, id: data?.id };

    } catch (err: any) {
        console.error("❌ Error en submitBooking:", err.message);
        return {
            success: true,
            emailFailed: true,
            error: err.message || "Email service unavailable"
        };
    }
}
