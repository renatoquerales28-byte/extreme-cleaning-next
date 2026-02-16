# 📍 GESTIÓN DE ZIPCODES - GUÍA COMPLETA

## 🎯 Resumen

Ya tienes un **sistema completo** para gestionar zipcodes (códigos postales) desde el panel de administración.

---

## 🚀 Cómo Acceder

### 1. **Inicia sesión en el Admin**
```
URL: http://localhost:3000/admin/login

Credenciales:
- Username: admin
- Password: extreme-admin-2026
```

### 2. **Ve a Locations**
```
URL: http://localhost:3000/admin/locations
```

---

## ✨ Funcionalidades Disponibles

### 1. **Agregar Nuevo Zipcode** ➕

**Formulario incluye:**
- **Zip Code** (5 dígitos, requerido)
- **City Name** (opcional)
- **Status:**
  - `Active` - Área serviceable
  - `Coming Soon` - En lista de espera

**Ejemplo:**
```
Zip Code: 00600
City Name: Naguanagua
Status: Active
```

Click **"Add Location"** → ✅ Listo!

---

### 2. **Editar Zipcode Existente** ✏️

1. Busca el zipcode en la lista
2. Click en el ícono de **editar** (lápiz)
3. Modifica `City Name` o `Status`
4. Click **"Update"**

**Nota:** No puedes cambiar el Zip Code. Si necesitas cambiarlo, elimina y crea uno nuevo.

---

### 3. **Eliminar Zipcode** 🗑️

1. Busca el zipcode en la lista
2. Click en el ícono de **eliminar** (basura)
3. Confirma la eliminación
4. ✅ Eliminado!

---

## 🔄 Cómo Funciona con el Wizard

### **Paso 1: Usuario ingresa Zipcode**
```typescript
// En ZipStep.tsx
const zipCode = "00600"; // Usuario ingresa
```

### **Paso 2: Sistema valida disponibilidad**
```typescript
const result = await checkZipAvailability(zipCode);

if (result.status === 'active') {
  // ✅ Área serviceable - Continuar wizard
  console.log(`Servicing ${result.city}`);
  
} else if (result.status === 'coming_soon') {
  // ⏳ Coming soon - Mostrar mensaje
  console.log('We will be there soon!');
  
} else {
  // ❌ No disponible - Mostrar mensaje
  console.log('Sorry, we don\'t service this area yet');
}
```

### **Paso 3: Wizard se adapta**
- **Active:** Continúa normalmente
- **Coming Soon:** Muestra mensaje de lista de espera
- **Unavailable:** Bloquea el avance

---

## 📊 Estados de Zipcode

| Estado | Significado | Wizard Behavior |
|--------|-------------|-----------------|
| **Active** | ✅ Área serviceable | Permite continuar |
| **Coming Soon** | ⏳ Próximamente | Muestra waitlist |
| **No existe** | ❌ No disponible | Bloquea wizard |

---

## 🎨 Interfaz del Admin

### **Vista de Lista**
```
┌─────────────────────────────────────┐
│ 📍 Existing Areas (3)               │
├─────────────────────────────────────┤
│ ✅ 00600                            │
│    NAGUANAGUA                       │
│    [ACTIVE] [✏️] [🗑️]              │
├─────────────────────────────────────┤
│ ⚠️ 00601                            │
│    VALENCIA                         │
│    [COMING SOON] [✏️] [🗑️]         │
├─────────────────────────────────────┤
│ ✅ 00602                            │
│    SAN DIEGO                        │
│    [ACTIVE] [✏️] [🗑️]              │
└─────────────────────────────────────┘
```

### **Formulario de Agregar/Editar**
```
┌─────────────────────────────────────┐
│ ➕ Add New Location                 │
├─────────────────────────────────────┤
│ ZIP CODE                            │
│ [00603_____________]                │
│                                     │
│ CITY NAME                           │
│ [Guacara___________]                │
│                                     │
│ STATUS                              │
│ [Active ▼]                          │
│                                     │
│ [Add Location]                      │
└─────────────────────────────────────┘
```

---

## 🔧 Acciones del Backend

### **1. checkZipAvailability(zip)**
```typescript
// Verifica si un zipcode está disponible
const result = await checkZipAvailability("00600");
// Returns: { status: 'active', city: 'Naguanagua' }
```

### **2. upsertServiceArea(data)**
```typescript
// Crea o actualiza un zipcode
await upsertServiceArea({
  zip: "00600",
  city: "Naguanagua",
  status: "active"
});
```

### **3. getAllServiceAreas()**
```typescript
// Obtiene todos los zipcodes
const { data } = await getAllServiceAreas();
// Returns: [{ id: 1, zipCode: "00600", city: "Naguanagua", status: "active" }]
```

### **4. deleteServiceArea(id)**
```typescript
// Elimina un zipcode
await deleteServiceArea(1);
```

---

## 📝 Base de Datos

### **Tabla: service_areas**
```sql
CREATE TABLE service_areas (
  id SERIAL PRIMARY KEY,
  zip_code VARCHAR(5) UNIQUE NOT NULL,
  city VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **Ejemplo de Datos**
```sql
INSERT INTO service_areas (zip_code, city, status) VALUES
  ('00600', 'Naguanagua', 'active'),
  ('00601', 'Valencia', 'active'),
  ('00602', 'San Diego', 'coming_soon'),
  ('00603', 'Guacara', 'active');
```

---

## 🎯 Casos de Uso

### **Caso 1: Expandir a Nueva Área**
```
1. Ve a /admin/locations
2. Agrega nuevo zipcode:
   - Zip: 00604
   - City: Los Guayos
   - Status: coming_soon
3. Cuando estés listo, cambia status a "active"
```

### **Caso 2: Temporalmente Deshabilitar Área**
```
1. Ve a /admin/locations
2. Edita el zipcode
3. Cambia status de "active" a "coming_soon"
4. Los nuevos usuarios verán mensaje de waitlist
```

### **Caso 3: Eliminar Área que Ya No Servimos**
```
1. Ve a /admin/locations
2. Click en eliminar (🗑️)
3. Confirma
4. El zipcode ya no estará disponible en el wizard
```

---

## ✅ Checklist de Configuración Inicial

### **Para empezar a usar el sistema:**

- [ ] **1. Accede al admin**
  ```
  http://localhost:3000/admin/login
  ```

- [ ] **2. Ve a Locations**
  ```
  http://localhost:3000/admin/locations
  ```

- [ ] **3. Agrega tus zipcodes principales**
  ```
  Ejemplo para Venezuela (Carabobo):
  - 00600 - Naguanagua - Active
  - 00601 - Valencia - Active
  - 00602 - San Diego - Active
  - 00603 - Guacara - Active
  - 00604 - Los Guayos - Coming Soon
  ```

- [ ] **4. Prueba el wizard**
  ```
  http://localhost:3000/quote
  Ingresa un zipcode que agregaste
  ```

- [ ] **5. Verifica que funcione**
  ```
  ✅ Zipcode activo → Continúa wizard
  ⏳ Coming soon → Muestra mensaje
  ❌ No existe → Bloquea wizard
  ```

---

## 🚀 Mejoras Futuras Sugeridas

### **1. Importación Masiva**
```typescript
// Permitir subir CSV con múltiples zipcodes
const importZipcodes = async (file: File) => {
  // Parse CSV
  // Bulk insert
};
```

### **2. Validación Automática**
```typescript
// Validar zipcode con API externa
const validateZipcode = async (zip: string) => {
  const res = await fetch(`https://api.zippopotam.us/ve/${zip}`);
  const data = await res.json();
  return data.places[0]?.['place name'];
};
```

### **3. Mapa Visual**
```typescript
// Mostrar zipcodes en un mapa
<GoogleMap>
  {areas.map(area => (
    <Marker position={area.coordinates} />
  ))}
</GoogleMap>
```

### **4. Analytics**
```typescript
// Mostrar estadísticas
- Zipcodes más solicitados
- Áreas con más demanda (coming_soon)
- Conversión por zipcode
```

---

## 🐛 Troubleshooting

### **Problema: No se guardan los zipcodes**
```
✅ Verifica que Supabase esté activo
✅ Revisa la consola del navegador
✅ Verifica que la tabla service_areas exista
```

### **Problema: El wizard no valida el zipcode**
```
✅ Verifica que checkZipAvailability() funcione
✅ Revisa ZipStep.tsx
✅ Asegúrate de que el zipcode exista en la DB
```

### **Problema: No puedo editar el zipcode**
```
✅ Por diseño, el zipcode es la clave primaria
✅ Para cambiar: Elimina y crea uno nuevo
✅ O edita directamente en la base de datos
```

---

## 📊 Resumen

**Ya tienes:**
- ✅ Panel de admin completo
- ✅ CRUD de zipcodes
- ✅ Validación en wizard
- ✅ Estados (active/coming_soon)
- ✅ UI premium

**Solo necesitas:**
1. Agregar tus zipcodes
2. Probar el wizard
3. ¡Listo para usar!

---

**Acceso rápido:**
- Admin: http://localhost:3000/admin/locations
- Wizard: http://localhost:3000/quote

**Credenciales:**
- Username: `admin`
- Password: `extreme-admin-2026`

---

**Generado por:** Antigravity AI  
**Fecha:** 28 de Enero, 2026  
**Versión:** 1.0
