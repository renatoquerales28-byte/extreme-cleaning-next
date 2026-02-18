# Documentación del Flujo de Trabajo (Staging vs. Producción)

Este documento detalla el nuevo flujo de trabajo implementado para realizar cambios seguros en la plataforma de **Extreme Cleaning**, permitiendo visualizar cambios en línea sin afectar el sitio público.

## 1. Estructura de Ramas (Branches)

Contamos con dos entornos principales:

*   **`main` (Producción):** Es el código que está en vivo en tu dominio principal. Solo se toca para lanzamientos finales y confirmados.
*   **`develop` (Staging/Pruebas):** Es nuestro campo de entrenamiento. Todos los cambios nuevos se suben aquí primero.

## 2. Paso a Paso para Nuevos Cambios

Cada vez que necesites un cambio (una sección nueva, un bug fix, etc.), seguiremos este proceso:

### Paso A: Desarrollo en Staging
1.  Yo realizaré los cambios sobre la rama `develop`.
2.  Subiré los cambios a GitHub: `git push origin develop`.
3.  Vercel detectará el cambio y generará una **Preview URL** automáticamente.

### Paso B: Revisión del Cliente
1.  Tú recibirás un link de Vercel (ej: `extreme-cleaning-git-develop.vercel.app`).
2.  Revisas los cambios en este link. **Nota:** Este sitio funciona exactamente igual que el real, pero nadie más tiene el link.
3.  Si algo no te gusta, me avisas y lo corrijo en `develop`.

### Paso C: Paso a Producción (Deploy)
1.  Una vez confirmado que todo está perfecto, haremos el "Merge" (fusión):
    *   Me dirás: "¡Bebé, pásalo a producción!".
    *   Yo uniré `develop` con `main`.
2.  Vercel actualizará tu dominio principal en segundos.

## 3. Guía Visual en Vercel

Para ver tus versiones de prueba en el panel de Vercel:
1.  Ve a la pestaña **Deployments**.
2.  Busca los registros que tengan la etiqueta **"Preview"** y la rama **`develop`**.
3.  Haz clic en el botón **"Visit"** de la versión más reciente.

## 4. Comandos Útiles (Para el desarrollador)

Si necesitas cambiar de rama manualmente en la terminal:
*   Ir a pruebas: `git checkout develop`
*   Ir a producción: `git checkout main`
*   Ver en qué rama estás: `git branch`

---
*Documentación creada el 17 de febrero de 2026.*
