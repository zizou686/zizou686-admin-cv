# Arturo Admin CV

Panel administrador adaptado para el CV de Arturo Carrera Huerta.

## Base de datos Firestore
Usa las colecciones:

- `header` → documento `arturo`
- `education`
- `work_experience`
- `skills`
- `certificates`
- `languages`
- `interests`

## Ejecutar backend

```bash
cd backend
npm install
npm run dev
```

Necesitas colocar tu `serviceAccountKey.json` dentro de `backend/` o configurar la variable `FIREBASE_SERVICE_ACCOUNT`.

## Frontend

Abre `frontend/index.html` o entra al backend en `http://localhost:3000`.

Repositorio sugerido para GitHub Pages del admin:

```text
https://github.com/zizou686/zizou686-admin.github.io.git
```
