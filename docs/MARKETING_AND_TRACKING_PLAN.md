# 🎯 Plan de Implementación: Marketing & Analytics
**Proyecto:** Extreme Cleaning Service  
**Propósito:** Rastrear conversiones, optimizar publicidad y cumplir con normativas de privacidad.

---

## 1. Google Analytics (GA4)
**Objetivo:** Entender de dónde vienen los usuarios (Google Search, Redes Sociales, Directo) y qué hacen en el sitio.

*   **Identificador necesario:** `MEASUREMENT ID` (ej. G-XXXXXXXX).
*   **Métricas clave:** 
    *   Usuarios activos diarios.
    *   Páginas más visitadas.
    *   Tasa de rebote (gente que se va sin hacer nada).
    *   Localización geográfica de los clientes.

---

## 2. Meta Pixel (Facebook/Instagram)
**Objetivo:** Optimizar campañas de anuncios en Meta y permitir el "Remarketing" (mostrar anuncios a quienes ya visitaron el sitio).

*   **Identificador necesario:** `PIXEL ID`.
*   **Funcionalidad:** Crea un puente entre tu sitio web y el administrador de anuncios de Meta para medir el retorno de inversión (ROAS).

---

## 3. Embudos de Conversión (Event Tracking)
No solo mediremos visitas, sino acciones específicas dentro del **Wizard de Reserva**:

| Evento | Momento del Disparo | Utilidad |
| :--- | :--- | :--- |
| **ViewContent** | Al entrar a la Landing Page | Saber cuánta gente ve la oferta inicial. |
| **LeadEntry** | Al poner el ZIP Code y dar a "Next" | Identificar interés inicial por zona. |
| **PriceViewed** | Al llegar al Quote Step (Email/Precio) | Saber cuánta gente llegó a ver el costo. |
| **Purchase / Booked** | Al ver la pantalla de éxito final | **Conversión Real.** Mide el dinero ganado versus invertido. |

---

## 4. Privacidad & Banner de Cookies (Legal)
Para cumplir con leyes como GDPR o CCPA, la implementación incluirá:

*   **Banner Discreto:** Un aviso en la parte inferior (estilo minimalista acorde a la web) que informe sobre el uso de cookies.
*   **Consent Mode:** Los scripts de Google y Meta estarán "dormidos" hasta que el usuario haga clic en "Aceptar".
*   **Página de Privacidad:** Sección donde se detalla qué se hace con los datos (estándar para evitar multas).

---

## 5. Complejidad y Tiempos
*   **Nivel de Dificultad:** 3/10 (Sencillo pero requiere precisión técnica).
*   **Tiempo de Implementación:** Aproximadamente 2-3 horas de trabajo técnico.
*   **Requerimiento previo:** El dueño de ECS debe tener creadas sus cuentas en Google Analytics y Meta Business Suite.

---
*Este documento es una hoja de ruta estratégica para la siguiente fase de crecimiento de la plataforma. Ningún cambio ha sido aplicado aún.*
