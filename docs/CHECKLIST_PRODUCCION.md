# ✅ CHECKLIST PARA PRODUCCIÓN - ECS

## 🔴 CRÍTICO - Antes de Deploy

### 1. Configurar Email Service (Resend)
- [ ] Crear cuenta en [Resend.com](https://resend.com)
- [ ] Obtener API Key
- [ ] Agregar a `.env.local`:
  ```env
  RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
  ```
- [ ] Verificar dominio personalizado en Resend
- [ ] Actualizar email "from" en `src/app/actions/booking.tsx`:
  ```typescript
  from: "ECS Team <noreply@tudominio.com>"
  ```
- [ ] Descomentar generación de PDF (líneas 14-16, 31-36)
- [ ] Probar envío de email de confirmación

### 2. Seguridad - Actualizar Credenciales
- [ ] Generar nuevo `NEXTAUTH_SECRET`:
  ```bash
  openssl rand -base64 32
  ```
- [ ] Actualizar en `.env.local`:
  ```env
  NEXTAUTH_SECRET=<nuevo_secret_generado>
  ADMIN_USERNAME=<nuevo_usuario>
  ADMIN_PASSWORD=<contraseña_segura>
  ```
- [ ] Cambiar URL de producción:
  ```env
  NEXTAUTH_URL=https://tudominio.com
  ```

### 3. Base de Datos - Migraciones
- [ ] Verificar conexión a Supabase
- [ ] Ejecutar migraciones (si aplica):
  ```bash
  npm run db:push
  ```
- [ ] Verificar que todas las tablas existan:
  - leads
  - service_areas
  - promotions
  - pricing_config
  - calendar_settings
  - blocked_dates

### 4. Variables de Entorno - Producción
- [ ] Copiar todas las variables a tu plataforma de hosting
- [ ] Verificar que no haya variables con valores de desarrollo
- [ ] Asegurar que `NODE_ENV=production`

---

## 🟡 IMPORTANTE - Configuración Inicial

### 5. Datos Iniciales - Pricing Config
Ejecutar en consola de Supabase o crear script:

```sql
INSERT INTO pricing_config (key, value, description) VALUES
('base_price_residential', 150, 'Precio base residencial'),
('base_price_commercial', 300, 'Precio base comercial'),
('price_per_bedroom', 25, 'Precio por habitación'),
('price_per_bathroom', 20, 'Precio por baño'),
('price_per_sqft', 0, 'Precio por pie cuadrado'),
('deep_clean_multiplier', 150, 'Multiplicador limpieza profunda (%)'),
('move_clean_multiplier', 175, 'Multiplicador mudanza (%)'),
('discount_weekly', 20, 'Descuento semanal (%)'),
('discount_biweekly', 15, 'Descuento quincenal (%)'),
('discount_monthly', 10, 'Descuento mensual (%)');
```

- [ ] Insertar configuración de precios
- [ ] Verificar en `/admin/pricing`

### 6. Datos Iniciales - Service Areas
```sql
INSERT INTO service_areas (zip_code, city, status) VALUES
('99201', 'Spokane', 'active'),
('99202', 'Spokane', 'active'),
('99203', 'Spokane', 'active');
-- Agregar más códigos postales según cobertura
```

- [ ] Insertar zonas de servicio
- [ ] Verificar en `/admin/locations`

### 7. Datos Iniciales - Calendar Settings
```sql
INSERT INTO calendar_settings (day_of_week, is_open, start_time, end_time) VALUES
(0, false, '08:00', '17:00'), -- Domingo
(1, true, '08:00', '17:00'),  -- Lunes
(2, true, '08:00', '17:00'),  -- Martes
(3, true, '08:00', '17:00'),  -- Miércoles
(4, true, '08:00', '17:00'),  -- Jueves
(5, true, '08:00', '17:00'),  -- Viernes
(6, true, '09:00', '15:00');  -- Sábado
```

- [ ] Configurar horarios de operación
- [ ] Verificar en `/admin/calendar`

---

## 🟢 RECOMENDADO - Mejoras

### 8. Testing
- [ ] Probar flujo completo del wizard
- [ ] Verificar cálculo de precios
- [ ] Probar envío de emails
- [ ] Verificar panel de admin
- [ ] Probar en diferentes dispositivos
- [ ] Verificar accesibilidad

### 9. SEO y Analytics
- [ ] Agregar Google Analytics
- [ ] Configurar Google Search Console
- [ ] Verificar meta tags en todas las páginas
- [ ] Crear sitemap.xml
- [ ] Configurar robots.txt

### 10. Monitoreo
- [ ] Configurar Sentry para error tracking
- [ ] Configurar logs estructurados
- [ ] Configurar alertas de disponibilidad
- [ ] Configurar backup de base de datos

### 11. Performance
- [ ] Ejecutar Lighthouse audit
- [ ] Optimizar imágenes
- [ ] Configurar CDN
- [ ] Habilitar compresión gzip/brotli
- [ ] Configurar caché headers

---

## 🔵 OPCIONAL - Futuras Mejoras

### 12. Funcionalidades Adicionales
- [ ] Sistema de notificaciones (SMS)
- [ ] Recordatorios automáticos
- [ ] Sistema de reviews/testimonios
- [ ] Chat en vivo
- [ ] Programa de referidos
- [ ] App móvil

### 13. Integraciones
- [ ] Stripe/PayPal para pagos
- [ ] Calendly para agendamiento
- [ ] Zapier para automatizaciones
- [ ] CRM (HubSpot, Salesforce)

---

## 📋 Comandos Útiles

### Desarrollo
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Verificar código
```

### Base de Datos
```bash
npm run db:push      # Aplicar cambios al schema
npm run db:studio    # Abrir Drizzle Studio (si está configurado)
```

### Deployment
```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod

# Manual
npm run build && npm run start
```

---

## 🎯 Orden de Ejecución Recomendado

1. ✅ Configurar Resend API Key
2. ✅ Actualizar credenciales de seguridad
3. ✅ Insertar datos iniciales en DB
4. ✅ Probar flujo completo localmente
5. ✅ Configurar variables de entorno en hosting
6. ✅ Deploy a staging
7. ✅ Testing en staging
8. ✅ Deploy a producción
9. ✅ Monitoreo post-deploy

---

## 📞 Soporte

Si encuentras algún problema:
1. Revisar logs en consola del navegador
2. Revisar logs del servidor
3. Verificar variables de entorno
4. Consultar documentación de Next.js 14

---

**Última actualización:** 2026-01-28
