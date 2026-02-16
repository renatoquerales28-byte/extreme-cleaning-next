# 🧙‍♂️ Guía de Migración y Activación: Wizard Fase 2

Este documento explica cómo funciona la estructura de "Congelado" (Backup) del Wizard complejo y cómo reactivarlo en el futuro.

## 📁 Estructura de Archivos (Fase 2)

Para preservar la lógica avanzada (19 pasos, flujo de retorno complejo, etc.) sin interferir con la simplificación de la Fase 1, se han duplicado los siguientes archivos:

1.  **Componente Principal:** `src/components/wizard/v2/ExtremeCleaningWizardV2.tsx`
2.  **Configuración de Pasos:** `src/lib/wizard/config-v2.tsx` (Define el orden y lógica de navegación).
3.  **Componentes de Pasos:** `src/components/wizard/v2/steps/` (Contiene los 19 archivos `.tsx` originales).

## 🚀 Cómo Reactivar la Fase 2

Si en el futuro deseas volver a la versión completa del Wizard, solo debes seguir estos pasos:

### Opción A: Reemplazo Total (Recomendado)
Sustituye el import en la página que renderiza el Wizard (por ejemplo, `src/app/book/page.tsx` o similar):

```tsx
// Cambia esto:
import ExtremeCleaningWizard from "@/components/wizard/ExtremeCleaningWizard";

// Por esto:
import ExtremeCleaningWizard from "@/components/wizard/v2/ExtremeCleaningWizardV2";
```

### Opción B: Restaurar como Primario
Si prefieres que la versión v2 vuelva a ser la estándar en las carpetas principales:
1. Copia el contenido de `src/lib/wizard/config-v2.tsx` a `src/lib/wizard/config.tsx`.
2. Borra los archivos en `src/components/wizard/steps/`.
3. Copia todos los archivos de `src/components/wizard/v2/steps/` a `src/components/wizard/steps/`.
4. Asegúrate de ajustar los imports si es necesario (aunque el config-v2 ya apunta a las rutas correctas).

## 🧠 Diferencias Clave entre Versiones

| Característica | Fase 1 (Simplificada) | Fase 2 (Completa) |
| :--- | :--- | :--- |
| **Pasos Totales** | TBD (Propuesto 4-5) | 19 (Opcionales/Condicionales) |
| **Flujo de Retorno** | Simplificado | Búsqueda por Teléfono + Selección de Propiedad |
| **Property Management** | Básico | Detallado (Multi-propiedad) |
| **Configuración** | Consolidada | Paso a paso (Bedrooms -> Bathrooms -> Type) |

## ⚠️ Notas Técnicas
*   Ambas versiones comparten el mismo **Schema de Zod** (`src/lib/schemas/wizard.ts`) y las mismas **Server Actions** (`src/app/actions/admin.ts`).
*   La base de datos (PostgreSQL/Drizzle) es compatible con ambas versiones gracias al uso del campo JSONB `details`.

---
*Documentación generada por Antigravity AI - 15 de Febrero, 2026*
