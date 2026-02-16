# 🚀 GUÍA DE ACTIVACIÓN: Fase 2 (Promociones y Referidos)

Este documento detalla los pasos exactos para activar el sistema completo de marketing y descuentos que fue pre-construido y ocultado durante la Fase 1.

---

## 🛠️ Paso 1: Activar el "Switch Maestro" (Feature Flag)
Todo el sistema está controlado por un archivo de configuración central. Para encenderlo, sigue estos pasos:

1.  Abre el archivo: `src/lib/config/features.ts`
2.  Cambia el valor de `ENABLE_PROMOTIONS` de `false` a `true`.

```typescript
// src/lib/config/features.ts
export const FEATURE_FLAGS = {
    ENABLE_PROMOTIONS: true, // <--- CAMBIAR ESTO
    // ...
};
```

---

## 📋 Paso 2: ¿Qué aparecerá automáticamente?

Una vez activado el switch, los siguientes elementos se volverán visibles:

### En el Wizard (Cliente):
*   En el paso **"Quote"** (donde se ingresa el nombre y email), aparecerá el campo para ingresar cupones.
*   El sistema validará automáticamente:
    *   Si el código existe.
    *   Si el código ha expirado.
    *   Si el código ya alcanzó su límite de usos.

### En el Panel de Administración (Dueño):
*   **Menú Lateral:** Aparecerá la opción **"Promotions"** bajo el botón de "Locations".
*   **Gestión de Códigos:** El dueño podrá crear nuevos códigos (ej: "SUMMER2026"), elegir si son fijos ($) o porcentuales (%), y activarlos/desactivarlos.
*   **Acción Rápida en Leads:** Al ver los detalles de un Lead, aparecerá el botón **"Gift Discount"** para generar cupones VIP de un solo uso que caducan en 48h.

---

## ⚙️ Paso 3: Verificación Técnica

Para asegurar que todo esté funcionando al 100%, se recomienda verificar:

1.  **Base de Datos:** Asegúrate de que las tablas de `promotions` estén creadas (ya deberían estar mediante las migraciones previas).
2.  **Redención:** Realiza una reserva de prueba con un código creado. Verifica que en el Dashboard de Leads aparezca el descuento aplicado y que en la sección de Promotions el contador de "Usos" haya subido.

---

## 📧 Próximas Mejoras (Post-Activación)
Una vez la Fase 2 esté activa, estos son los siguientes niveles sugeridos:
1.  **Emails Automáticos:** Configurar que el cupón generado se envíe solo por email.
2.  **Referidos:** Activar `ENABLE_REFERRALS` en el mismo archivo de configuración para empezar a rastrear quién recomienda a quién.

---
*Documentación preparada para el equipo de Extreme Cleaning Service.*
