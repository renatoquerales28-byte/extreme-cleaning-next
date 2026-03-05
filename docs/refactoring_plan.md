# Plan de Refactorización y Mejora de Código (Code Review)

Este documento detalla las áreas críticas identificadas para mejorar la mantenibilidad, escalabilidad y limpieza del proyecto Extreme Cleaning.

## 1. Descomposición de Componentes "Monstruo"
**Estado actual:** Archivos como `HeroSection.tsx` y `ServiceSelectorSection.tsx` superan las 500 líneas al mezclar lógica de escritorio y móvil.
**Acción:** 
- Separar en sub-componentes especializados: `HeroDesktop.tsx`, `HeroMobile.tsx`, `ServiceSelectorDesktop.tsx`, etc.
- Extraer elementos comunes (como el sello rotativo o los inputs) a componentes UI reutilizables.

## 2. Desacoplamiento de Lógica de Negocio en el Wizard
**Estado actual:** El archivo `ExtremeCleaningWizard.tsx` maneja validaciones, sincronización de base de datos (leads) y navegación simultáneamente.
**Acción:**
- Mover el `validationMap` al archivo central de configuración `config.tsx`.
- Crear un Custom Hook `useLeadCapture` para manejar de forma aislada la creación y actualización de leads en la BD.
- Separar la vista de navegación de la lógica de procesamiento de datos.

## 3. Centralización de Mapeos y Constantes
**Estado actual:** Existen diccionarios de traducción (`typeMap`, `intensityMap`) duplicados y "quemados" en las funciones de UI.
**Acción:**
- Mover todos los mapeos de tipos de servicio e intensidades a un archivo central de constantes o al esquema de Zod en `lib/schemas/wizard.ts`.
- Asegurar que la UI consuma una única fuente de verdad para estos valores.

## 4. Limpieza de Código "Zombi"
**Estado actual:** Existe lógica inactiva (como el manejo de portfolios de Property Management) que sigue ejecutándose internamente.
**Acción:**
- Eliminar o comentar formalmente los bloques de lógica de servicios desactivados.
- Implementar flags de características (Feature Flags) si se planea activar/desactivar servicios frecuentemente, en lugar de comentar código.

## 5. Optimización de Estilos y Z-Index
**Estado actual:** Conflictos ocasionales de capas en animaciones del Hero.
**Acción:**
- Estandarizar una escala de `z-index` en una variable o configuración de Tailwind para evitar colisiones entre inputs y elementos decorativos animados.
