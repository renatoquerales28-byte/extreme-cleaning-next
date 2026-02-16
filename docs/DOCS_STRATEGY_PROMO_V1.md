# 🚀 Estrategia de Crecimiento: Sistema de Promociones & Referidos V2
**Proyecto:** Extreme Cleaning Service  
**Objetivo:** Maximizar conversiones y automatizar la gestión del dueño.

---

## 1. El Botón "Generate & Send" (Eficiencia Operativa)
**Problema Actual:** El dueño genera un código, lo copia, abre su correo/WhatsApp, redacta un mensaje y lo envía. Demasiada fricción.

**Propuesta:** Integrar el servicio de email (Resend) directamente en la tabla de Leads del Admin.
*   **Acción:** Un botón que genere el código único y dispare un email pre-diseñado profesionalmente.
*   **Impacto:** Ahorro de ~5 minutos por cliente. Imagen de marca mucho más profesional y corporativa.

---

## 2. Recuperación de "Leads Abandonados" (Conversión Proactiva)
**Problema Actual:** Muchos usuarios llegan al paso del precio y se van. Esos son "dinero dejado sobre la mesa".

**Propuesta:** Implementar un sistema de seguimiento automático.
*   **Acción:** Si un Lead se creó pero no pasó a estado "Booked" en 1 hora, el sistema marca el Lead como "Cold".
*   **Notificación:** El dueño recibe un aviso: *"Jane Doe no terminó su reserva. ¿Enviar cupón de $15?"*.
*   **Impacto:** Recuperación de hasta un 20-30% de ventas perdidas por indecisión o distracciones.

---

## 3. Dashboard de Impacto Financiero (Toma de Decisiones)
**Problema Actual:** No hay una forma clara de ver si los descuentos están ayudando a la rentabilidad o dañándola.

**Propuesta:** Una vista analítica en el Admin dedicada a promociones.
*   **Métricas Clave:**
    *   **ROI de Descuentos:** (Ventas con descuento) vs (Costo del descuento).
    *   **Tasa de Redención:** ¿Cuánta gente usa realmente los códigos enviados?
    *   **Referidor del Mes:** Quién está trayendo más clientes para premiarlo.
*   **Impacto:** Saber exactamente cuánto invertir en marketing y promociones sin adivinar.

---

## 4. Programa de Fidelidad Inteligente (Retención)
**Problema Actual:** No hay un incentivo automático para que el cliente vuelva después del primer servicio.

**Propuesta:** Sistema de "Hitos de Limpieza".
*   **Lógica:** Al completar el servicio #3, #5 o #10, el sistema genera automáticamente un código de regalo.
*   **Personalización:** *"¡Felicidades! Eres un cliente Platinum. Tu próxima limpieza move-out tiene un 30% OFF compartido"*.
*   **Impacto:** Aumenta el LTV (Life Time Value) del cliente. Es 7 veces más barato venderle a un cliente actual que conseguir uno nuevo.

---

## Próximos Pasos Técnicos (Roadmap sugerido):
1.  **Fase 1:** Configurar plantillas de email atractivas en el servidor.
2.  **Fase 2:** Añadir la columna `status` avanzada a los Leads para rastrear el flujo.
3.  **Fase 3:** Crear la tarea programada (Cron Job) que revise leads estancados.

---
*Este documento es una propuesta estratégica. No se aplicarán cambios en el código fuente hasta que el usuario lo apruebe explícitamente.*
