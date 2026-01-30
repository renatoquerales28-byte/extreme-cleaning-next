# 🎫 Sistema de Promociones y Referidos
**Estado del Proyecto:** Implementación Base Completada ✅

Este documento detalla el funcionamiento actual del sistema de descuentos y las propuestas de mejora para optimizar la rentabilidad y la gestión operativa de **Extreme Cleaning Service**.

---

## 🛠️ Implementación Actual (Lo que ya funciona)

### 1. Base de Datos (Backend)
- **Tabla `promotions`**: Almacena códigos únicos, valores de descuento (fijo o porcentaje), límites de uso y fechas de expiración.
- **Seguridad**: Los códigos están protegidos contra abuso mediante:
    - `max_uses`: Límite de cuántas veces se puede usar un código.
    - `current_uses`: Contador automático de usos reales.
    - `expires_at`: Fecha límite de validez.

### 2. Panel de Administración (Dueño)
- **Generación Manual**: Desde la vista de detalles de cualquier Lead, el dueño puede generar un cupón de regalo (Gift Discount).
- **Cupones VIP**: Por defecto, estos cupones son:
    - De un solo uso (Single Use).
    - Expira en 48 horas (crea urgencia en el cliente).
    - Formato: `VIP-XXXX`.

### 3. Wizard de Reserva (Experiencia del Cliente)
- **Validación Temprana**: El cliente ingresa el código en el **paso del Email (Quote Step)**.
- **Feedback Visual**: El sistema valida el código al instante y muestra el descuento aplicado antes de que el cliente avance, eliminando la barrera del "precio alto".
- **Persistencia**: El precio descontado se guarda en el Lead y se mantiene en el resumen final.

---

## 📈 Sistema de Referidos (Lógica de Crecimiento)

### Funcionamiento:
1. El cliente llega con un código de referido (ej: `JUAN25`).
2. El sistema aplica el descuento al amigo (incentivo de entrada).
3. El Lead se marca internamente con el código del referidor.
4. **Pendiente**: Sistema de recompensas automáticas para el referidor una vez que el servicio se complete.

---

## 🚀 Propuestas de Mejora (Upgrade Operativo)

### A. Automatización de Envío (Urgente)
*   **Situación Actual**: El dueño tiene que copiar el código y enviarlo manualmente.
*   **Mejora**: Añadir un botón "Generar y Enviar por Email". El sistema enviará un correo diseñado profesionalmente con el código y un enlace directo a la reserva.

### B. Recuperación de Leads Abandonados
*   **Situación Actual**: Si el cliente ve el precio y se va, el Lead queda guardado pero "frío".
*   **Mejora**: Si un Lead no reserva en 2 horas, enviar un cupón automático de "Primerizos" de $10 o $15 para incentivar el cierre.

### C. Programa de Lealtad (Retención)
*   **Situación Actual**: Cada limpieza se trata como una venta nueva desde cero.
*   **Mejora**: Sistema de "Limpieza Diamante". Cada 5 servicios, el cliente recibe un cupón automático de 30% OFF para el siguiente.

### D. Analytics de Descuentos
*   **Situación Actual**: No se sabe cuánto dinero se está "perdonando" en total.
*   **Mejora**: Vista en el Admin que muestre:
    - Total de dinero descontado vs Gasto total en reservas vinculadas.
    - Rankings de códigos más usados.

---

## 💡 Recomendación Estratégica
Para el dueño de **Extreme Cleaning**, la mayor mejora inmediata es la **Fase A (Automatización de Envío)**. Esto reduce el tiempo administrativo a cero y garantiza que el cliente reciba la oferta mientras su interés está en el punto más alto.

---
*Documentación generada por Antigravity AI.*
