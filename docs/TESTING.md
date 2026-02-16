# 🧪 Testing Guide

## 📋 Resumen

Este proyecto usa **Vitest** para testing con las siguientes características:
- ✅ Unit tests
- ✅ Integration tests
- ✅ Coverage reports
- ✅ Watch mode
- ✅ UI mode

---

## 🚀 Comandos Disponibles

### **Ejecutar todos los tests (una vez)**
```bash
npm run test
```

### **Ejecutar tests en modo watch** (re-ejecuta al guardar)
```bash
npm run test:watch
```

### **Abrir UI interactiva de tests**
```bash
npm run test:ui
```

### **Generar reporte de coverage**
```bash
npm run test:coverage
```

---

## 📁 Estructura de Tests

```
src/
├── lib/
│   └── __tests__/
│       ├── validation.test.ts      ✅ Tests de validación
│       ├── pricing.test.ts         ✅ Tests de pricing
│       └── dateUtils.test.ts       ✅ Tests de utilidades de fecha
├── app/
│   └── actions/
│       └── __tests__/
│           └── location.test.ts    ✅ Tests de server actions
└── test/
    └── setup.ts                    ⚙️ Configuración global
```

---

## 📊 Tests Implementados

### **1. Validation Tests** (`validation.test.ts`)
Tests de funciones de validación:
- ✅ `validateZipCode()` - 6 tests
- ✅ `validateEmail()` - 5 tests
- ✅ `validatePhone()` - 4 tests
- ✅ `calculateTotal()` - 6 tests

**Total: 21 tests**

### **2. Location Tests** (`location.test.ts`)
Tests de server actions de locations:
- ✅ `checkZipAvailability()` - 4 tests
- ✅ `getAllServiceAreas()` - 2 tests
- ✅ `upsertServiceArea()` - 3 tests
- ✅ `deleteServiceArea()` - 3 tests

**Total: 12 tests**

### **3. Pricing Tests** (`pricing.test.ts`)
Tests de lógica de pricing:
- ✅ `calculateResidentialPrice()` - 8 tests
- ✅ `calculateCommercialPrice()` - 5 tests
- ✅ `applyPromoCode()` - 5 tests
- ✅ Edge cases - 5 tests

**Total: 23 tests**

### **4. Date Utils Tests** (`dateUtils.test.ts`)
Tests de utilidades de fecha:
- ✅ `formatDate()` - 2 tests
- ✅ `formatTime()` - 3 tests
- ✅ `isWeekend()` - 3 tests
- ✅ `isBusinessHours()` - 6 tests
- ✅ `addDays()` - 3 tests
- ✅ `isSameDay()` - 3 tests
- ✅ `getNextAvailableDate()` - 3 tests
- ✅ `getTimeSlots()` - 4 tests

**Total: 27 tests**

---

## 📈 Coverage Actual

**Total de tests: 83 tests** ✅

Ejecuta `npm run test:coverage` para ver el reporte completo.

---

## 🎯 Cómo Escribir Nuevos Tests

### **Ejemplo: Test Unitario**

```typescript
// src/lib/__tests__/myFunction.test.ts
import { describe, it, expect } from 'vitest';
import { myFunction } from '../myFunction';

describe('myFunction', () => {
  it('should do something', () => {
    const result = myFunction('input');
    expect(result).toBe('expected output');
  });

  it('should handle edge case', () => {
    const result = myFunction('');
    expect(result).toBe('default');
  });
});
```

### **Ejemplo: Test con Mock**

```typescript
import { describe, it, expect, vi } from 'vitest';

describe('myAsyncFunction', () => {
  it('should call API', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ data: 'test' });
    global.fetch = mockFetch;

    const result = await myAsyncFunction();
    
    expect(mockFetch).toHaveBeenCalled();
    expect(result).toEqual({ data: 'test' });
  });
});
```

---

## 🔍 Matchers Disponibles

### **Igualdad**
```typescript
expect(value).toBe(expected);           // Igualdad estricta (===)
expect(value).toEqual(expected);        // Igualdad profunda
expect(value).not.toBe(expected);       // Negación
```

### **Truthiness**
```typescript
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeDefined();
expect(value).toBeUndefined();
expect(value).toBeNull();
```

### **Números**
```typescript
expect(value).toBeGreaterThan(3);
expect(value).toBeGreaterThanOrEqual(3);
expect(value).toBeLessThan(5);
expect(value).toBeLessThanOrEqual(5);
expect(value).toBeCloseTo(0.3);         // Para decimales
```

### **Strings**
```typescript
expect(string).toContain('substring');
expect(string).toMatch(/regex/);
```

### **Arrays**
```typescript
expect(array).toHaveLength(3);
expect(array).toContain(item);
expect(array).toEqual(expect.arrayContaining([1, 2]));
```

### **Objetos**
```typescript
expect(object).toHaveProperty('key');
expect(object).toMatchObject({ key: 'value' });
```

---

## 🐛 Debugging Tests

### **Ver output detallado**
```bash
npm run test -- --reporter=verbose
```

### **Ejecutar un solo test file**
```bash
npm run test validation.test.ts
```

### **Ejecutar tests que coincidan con patrón**
```bash
npm run test -- -t "validateZipCode"
```

### **Ver coverage de un archivo específico**
```bash
npm run test:coverage -- validation.test.ts
```

---

## 📊 Interpretar Coverage Report

Después de ejecutar `npm run test:coverage`, verás:

```
File                    | % Stmts | % Branch | % Funcs | % Lines |
------------------------|---------|----------|---------|---------|
All files               |   85.23 |    78.42 |   90.00 |   85.23 |
 lib/validation.ts      |   95.00 |    90.00 |  100.00 |   95.00 |
 lib/pricing.ts         |   80.00 |    75.00 |   85.00 |   80.00 |
```

**Columnas:**
- **% Stmts**: % de statements ejecutados
- **% Branch**: % de ramas (if/else) probadas
- **% Funcs**: % de funciones probadas
- **% Lines**: % de líneas ejecutadas

**Meta:** 
- ✅ 50%+ = Básico
- ✅ 70%+ = Bueno
- ✅ 80%+ = Excelente

---

## 🎓 Best Practices

### **1. Nombrar tests descriptivamente**
```typescript
// ❌ Malo
it('works', () => { ... });

// ✅ Bueno
it('should return active status for valid zipcode', () => { ... });
```

### **2. Seguir patrón AAA**
```typescript
it('should calculate total with discount', () => {
  // Arrange (preparar)
  const price = 100;
  const discount = 10;
  
  // Act (ejecutar)
  const result = calculateTotal(price, 0, discount);
  
  // Assert (verificar)
  expect(result).toBe(90);
});
```

### **3. Un concepto por test**
```typescript
// ❌ Malo - múltiples conceptos
it('should validate everything', () => {
  expect(validateZip('00600')).toBe(true);
  expect(validateEmail('test@test.com')).toBe(true);
  expect(validatePhone('1234567890')).toBe(true);
});

// ✅ Bueno - un concepto
it('should validate zipcode', () => {
  expect(validateZip('00600')).toBe(true);
});

it('should validate email', () => {
  expect(validateEmail('test@test.com')).toBe(true);
});
```

### **4. Probar edge cases**
```typescript
describe('validateZipCode', () => {
  it('should accept valid zipcode', () => { ... });
  it('should reject empty string', () => { ... });
  it('should reject too short', () => { ... });
  it('should reject too long', () => { ... });
  it('should reject with letters', () => { ... });
});
```

---

## 🚨 Troubleshooting

### **Tests no se ejecutan**
```bash
# Verificar instalación
npm list vitest

# Reinstalar dependencias
npm install
```

### **Error: "Cannot find module"**
```bash
# Verificar alias en vitest.config.ts
# Asegurar que paths coincidan con tsconfig.json
```

### **Tests pasan localmente pero fallan en CI**
```bash
# Verificar variables de entorno
# Asegurar que mocks estén bien configurados
```

---

## 📚 Recursos

- **Vitest Docs**: https://vitest.dev
- **Testing Library**: https://testing-library.com
- **Jest DOM Matchers**: https://github.com/testing-library/jest-dom

---

## ✅ Checklist de Testing

Antes de hacer commit:

- [ ] Todos los tests pasan (`npm run test`)
- [ ] Coverage > 50% (`npm run test:coverage`)
- [ ] No hay tests skipped (.skip)
- [ ] No hay console.logs en tests
- [ ] Tests son descriptivos y legibles

---

**Última actualización:** 28 de Enero, 2026  
**Tests totales:** 83  
**Coverage:** Ejecuta `npm run test:coverage` para ver
