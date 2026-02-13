# Stack Tecnológico

Este documento describe el stack tecnológico utilizado en la landing page y la aplicación de reservas de Extreme Cleaning Solutions.

## Framework Principal
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Librería:** [React 18](https://react.dev/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)

## Estilos e Interfaz (UI)
- **Framework CSS:** [Tailwind CSS](https://tailwindcss.com/)
- **Animación:** [Framer Motion](https://www.framer.com/motion/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Utilidades:**
  - `clsx` y `tailwind-merge` para manejo de clases
  - `class-variance-authority` (CVA) para variantes de componentes
  - `tailwindcss-animate`
- **Fuentes:** Open Sans (vía `@fontsource/open-sans`)

## Formularios y Validación
- **Gestión de Formularios:** [React Hook Form](https://react-hook-form.com/)
- **Validación de Esquemas:** [Zod](https://zod.dev/)
- **Resolver:** `@hookform/resolvers`

## Backend y Base de Datos
- **Base de Datos:** PostgreSQL
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Proveedor de Base de Datos:** [Neon](https://neon.tech/) (Serverless)
- **Migraciones:** Drizzle Kit

## Autenticación y Servicios
- **Auth:** [NextAuth.js](https://next-auth.js.org/)
- **Email:** [Resend](https://resend.com/)
- **Generación de PDF:** `@react-pdf/renderer`

## Manejo de Estado y Datos
- **Manejo de Fechas:** `date-fns`
- **Procesamiento Excel:** `xlsx`
- **Notificaciones:** `sonner`

## Pruebas
- **Ejecutor de Pruebas:** [Vitest](https://vitest.dev/)
- **Entorno:** JSDOM
- **Librerías:**
  - `@testing-library/react`
  - `@testing-library/user-event`
  - `@testing-library/jest-dom`

## Infraestructura
- **Despliegue:** Vercel (inferido del contexto de uso)
- **Gestor de Paquetes:** npm

## Estructura de la Landing Page
La landing page (`src/app/page.tsx`) está compuesta por las siguientes secciones modulares ubicadas en `src/components/landing/`:

### 1. Navegación (Incluida en `page.tsx`)
- **Características:**
  - Posicionamiento sticky con efecto glassmorphism (`backdrop-blur-md`).
  - Enlaces de navegación con desplazamiento suave (Servicios, Proceso, Reseñas).
  - Menú móvil responsivo con botón de hamburguesa.
  - CTA "Obtener Cotización" que aparece al hacer scroll.

### 2. Sección Hero (`HeroSection.tsx`)
- **Propósito:** Propuesta de valor inmediata y punto de conversión principal.
- **Elementos Clave:**
  - Fondo de alto impacto (imagen/video).
  - Título y subtítulo.
  - CTA principal "Obtener una Cotización".
  - Indicadores de confianza o estadísticas rápidas.

### 3. Sección Problema/Solución (`ProblemSolutionSection.tsx`)
- **Propósito:** Abordar los puntos de dolor del usuario y presentar a ECS como la solución.
- **Elementos Clave:**
  - Diseño comparativo (Antes vs. Después o Problema vs. Solución).
  - Visuales demostrando el impacto de la limpieza.

### 4. Sección de Servicios (`ServicesSection.tsx`)
- **Propósito:** Mostrar los servicios de limpieza disponibles.
- **Elementos Clave:**
  - Diseño en cuadrícula de tarjetas de servicio.
  - Iconos usando `lucide-react`.
  - Descripciones detalladas para cada tipo de servicio (Residencial, Comercial, Mudanzas).

### 5. Sección de Proceso (`ProcessSection.tsx`)
- **Propósito:** Explicar el flujo de reserva y servicio.
- **Elementos Clave:**
  - Guía visual paso a paso (flujo 1-2-3-4).
  - Ilustraciones o iconos para cada paso.

### 6. Sección de Prueba Social (`SocialProofSection.tsx`)
- **Propósito:** Construir confianza a través de testimonios de clientes.
- **Elementos Clave:**
  - Tarjetas de reseñas / Carrusel.
  - Calificaciones con estrellas.
  - Nombres de clientes y detalles de verificación.

### 7. Sección Footer (`FooterSection.tsx`)
- **Propósito:** Mapa del sitio, información de contacto y enlaces legales.
- **Elementos Clave:**
  - Enlaces a secciones del sitio.
  - Detalles de contacto (Teléfono, Email, Dirección).
  - Iconos de redes sociales.
  - Avisos legales y de copyright.
