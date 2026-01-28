"use server";

import { Resend } from "resend";
// import { renderToBuffer } from "@react-pdf/renderer";
// import { BookingReceipt } from "@/components/pdf/BookingReceipt";

export async function submitBooking(formData: any) {
    try {
        console.log("📩 Iniciando proceso de reserva para:", formData.email);

        // OPTIMIZACIÓN: Si no hay API key, retornar inmediatamente sin intentar enviar
        if (!process.env.RESEND_API_KEY) {
            console.warn("⚠️ RESEND_API_KEY no configurada - Email omitido");
            return {
                success: true,
                skipped: true,
                message: "Booking saved (email skipped - no API key)"
            };
        }

        // Inicializar Resend solo si hay API key
        const resend = new Resend(process.env.RESEND_API_KEY);

        // OPTIMIZACIÓN: Timeout de 5 segundos para evitar esperas largas
        const emailPromise = resend.emails.send({
            from: "ECS Team <onboarding@resend.dev>",
            to: [formData.email],
            subject: "Confirmation: Your ECS Booking is Confirmed!",
            html: `
                <div style="font-family: sans-serif; color: #333;">
                    <h1>Hi ${formData.firstName},</h1>
                    <p>Your booking has been confirmed!</p>
                    <p><strong>Service Date:</strong> ${formData.serviceDate}</p>
                    <p><strong>Service Time:</strong> ${formData.serviceTime}</p>
                    <p style="color: #024653; font-weight: bold;">The ECS Team</p>
                </div>
            `,
        });

        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Email timeout")), 5000)
        );

        const { data, error } = await Promise.race([emailPromise, timeoutPromise]) as any;

        if (error) {
            console.error("❌ Error enviando email:", error);
            return { success: true, emailFailed: true, error: error.message };
        }

        console.log("✅ Email enviado con éxito:", data);
        return { success: true, id: data?.id };

    } catch (err: any) {
        console.error("❌ Error en submitBooking:", err.message);
        // Retornar success: true porque el booking ya se guardó en DB
        return {
            success: true,
            emailFailed: true,
            error: err.message || "Email service unavailable"
        };
    }
}
