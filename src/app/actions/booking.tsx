"use server";

import { Resend } from "resend";
// import { renderToBuffer } from "@react-pdf/renderer";
// import { BookingReceipt } from "@/components/pdf/BookingReceipt";

// Inicializar Resend con la variable de entorno
const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitBooking(formData: any) {
    try {
        console.log("📩 Iniciando proceso de reserva para:", formData.email);

        // 1. DIAGNOSTICO: Omitimos PDF temporalmente para probar envío
        // const pdfBuffer = await renderToBuffer(<BookingReceipt data={formData} />);
        console.log("⚠️ PDF Generation SKIPPED for testing");

        // 2. Enviar el correo usando Resend
        const { data, error } = await resend.emails.send({
            from: "ECS Team <onboarding@resend.dev>", // Usamos el dominio de prueba de Resend por ahora
            to: [formData.email], // Enviamos al correo que ingresó el usuario
            subject: "Confirmation: Your ECS Booking is Confirmed! (Test)",
            html: `
        <div style="font-family: sans-serif; color: #333;">
          <h1>Hi ${formData.firstName},</h1>
          <p>This is a test to verify email delivery connectivity.</p>
          <p><strong>Receipt generation is temporarily paused for diagnostics.</strong></p>
          <p style="color: #024653; font-weight: bold;">The ECS Team</p>
        </div>
      `,
            // attachments: [
            //   {
            //     filename: "ECS-Booking-Receipt.pdf",
            //     content: pdfBuffer,
            //   },
            // ],
        });

        if (error) {
            console.error("❌ Error enviando email:", error);
            return { success: false, error: error.message };
        }

        console.log("✅ Email enviado con éxito:", data);
        return { success: true, id: data?.id };

    } catch (err) {
        console.error("❌ Error crítico en submitBooking:", err);
        return { success: false, error: "Internal Server Error" };
    }
}
