# App Petraglia Romina — Landing de Venta

## Setup local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

El build queda en `/dist`.

## Deploy en GitHub Pages

### 1. Crear el repo en GitHub
Nombre del repo: `App-Petraglia-Romina`

### 2. Subir el proyecto

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/App-Petraglia-Romina.git
git push -u origin main
```

### 3. Hacer deploy del build

```bash
npm run build
cd dist
git init
git add .
git commit -m "deploy"
git push --force https://github.com/TU_USUARIO/App-Petraglia-Romina.git main:gh-pages
```

### 4. Activar GitHub Pages
- Ir a Settings → Pages
- Source: branch `gh-pages` / root
- La URL quedará: `https://TU_USUARIO.github.io/App-Petraglia-Romina/`

## Imágenes
Poné tus fotos en `/public` con los nombres:
- auto1.jpg
- auto2.jpg
- auto3.jpg
- auto4.jpg
- auto5.jpg

## Editar datos del auto
Todo en `src/App.jsx` dentro del objeto `CONFIG` al inicio del archivo.
