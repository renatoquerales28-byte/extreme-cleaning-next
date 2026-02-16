# 🚀 Documentación de Nuevas Funcionalidades - Extreme Cleaning Service (ECS)

Este documento detalla las últimas mejoras implementadas en el **Wizard de Reservas** y el **Admin Dashboard**, diseñadas para automatizar la logística, aumentar el ticket promedio y mejorar la retención de clientes.

---

## 1. 💎 Paso de Servicios Extras (Upselling)

Se ha integrado una nueva pantalla en el flujo de reserva que permite a los clientes personalizar su limpieza con servicios adicionales premium.

*   **Cómo funciona:** Después de configurar los detalles de la casa, el cliente ve una galería de iconos para añadir extras.
*   **Servicios incluidos:**
    *   Interior de Horno ($35)
    *   Interior de Nevera ($30)
    *   Ventanas Interiores ($50)
    *   Interior de Gabinetes ($40)
    *   Recargo por Mascotas ($25)
*   **Impacto Financiero:** El sistema suma estos valores al total estimado en tiempo real, aumentando el valor de cada reserva sin intervención humana.
*   **Gestión:** Los precios de estos extras pueden ser ajustados en el código o vinculados al panel de configuración en el futuro.

---

## 2. 👤 Sistema de Clientes Recurrentes (Cerebro de Datos)

El Wizard ahora posee la capacidad de reconocer a clientes antiguos mediante su número de teléfono, eliminando fricción y errores de entrada.

*   **Cómo funciona:** En el primer paso del Wizard, los clientes pueden hacer clic en "¿Eres un cliente recurrente?".
*   **Validación Real:** Al ingresar el teléfono, el sistema realiza una búsqueda en la base de datos de `leads` existentes.
*   **Auto-rellenado:** Si se encuentra una coincidencia, el sistema extrae automáticamente:
    *   Nombre y Apellido.
    *   Email.
    *   Lista de direcciones (propiedades) previamente limpiadas.
*   **Experiencia:** Al seleccionar una dirección, el Wizard salta directamente a los pasos finales, recordando la configuración de la casa (cuartos, baños, sqft) de la última vez.

---

## 3. 🛡️ Control de Capacidad y Bloqueo Inteligente

Hemos implementado un sistema preventivo para evitar el "overbooking" y proteger la agenda del equipo de limpieza.

*   **Cómo funciona:** Cada vez que un cliente intenta elegir una fecha en el calendario, el sistema cuenta cuántas reservas confirmadas existen ya para ese día.
*   **Límite Configurable:** El sistema compara ese conteo contra el límite de "Capacidad Máxima Diaria".
*   **Bloqueo Automático:** Si el límite se alcanza, el día se bloquea en el calendario visual del cliente con el mensaje: *"Fully Booked (Daily capacity reached)"*. No se permite avanzar hasta que el cliente elija un día con disponibilidad.

---

## 4. ⚙️ Dashboard: Control Maestro de Capacidad

El dueño del negocio ahora tiene el control total sobre cuántos servicios puede aceptar el sistema cada día sin necesidad de programadores.

*   **Ubicación:** Admin Dashboard > Pricing Configuration.
*   **Nuevo Parámetro:** `Max Capacity Per Day`.
*   **Uso:** 
    *   Si tienes un solo equipo: Configura en **1** o **2**.
    *   Si contratas más personal: Cambia el valor a **5** o **10**.
*   **Actualización Instantánea:** Al cambiar este número y guardar, el Wizard en el sitio web aplica la nueva regla de bloqueo inmediatamente.

---

## 🛠️ Notas Técnicas para el Futuro
- **Sincronización:** El sistema de capacidad es interno. Las citas anotadas fuera del sistema (manuales) deben ser registradas en el Admin para que el Wizard sepa que ese cupo está ocupado.
- **Validación de Teléfono:** Actualmente la búsqueda es directa por número. En fases futuras se recomienda añadir un código SMS de 4 dígitos para máxima seguridad.

---
**Documento generado para:** Extreme Cleaning Service (ECS)
**Estado:** Implementado y Activo.
