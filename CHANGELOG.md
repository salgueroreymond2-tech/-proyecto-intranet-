# Changelog (Historial de Cambios)

Todos los cambios notables realizados en este proyecto están registrados en este archivo. El formato de este historial se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

---

## [1.2.0] - 2026-08-12

### Añadido
- **Gestión de Calificaciones en Panel Admin:** El administrador ahora dispone de una tabla con el historial de todas las calificaciones registradas por los docentes, con permisos exclusivos para editarlas o eliminarlas mediante modales de SweetAlert2.
- **Gestión de Anuncios en el Tablón:** El administrador ahora puede crear nuevos comunicados oficiales (usando el botón "+ Nuevo Comunicado" que solo él visualiza) y editar/eliminar comunicados directamente en el tablón general.
- Estructuración dinámica de datos para notas y comunicados en memoria mediante arreglos JS.
- **Rediseño Profesional Académico:** Renovación total de la hoja de estilos en `styles.css` adoptando una paleta de colores institucional (azul marino, azul brillante e insignias doradas), tipografías modernas desde Google Fonts (`Outfit` para encabezados e `Inter` para texto corrido), bordes redondeados premium, transiciones interactivas en tarjetas/botones y diseño de tablas optimizado para visualización de registros escolares.

---

## [1.1.0] - 2026-08-12

### Añadido
- Integración de **SweetAlert2** mediante CDN para alertas, notificaciones y diálogos de confirmación estilizados en la UI.
- Notificaciones tipo *Toast* auto-descartables para evitar interrupciones en el flujo de trabajo del usuario (guardado de notas, baja de usuarios y actualizaciones exitosas).
- Nuevo modal con entrada de texto para la edición de nombres de usuario dentro del panel de administración.
- Documentos de desarrollo del proyecto: `CONTRIBUTING.md`, `CHANGELOG.md`, `docs/arquitectura.md`, `docs/requerimientos.md` y `AGENTS.md` (memoria técnica).

### Modificado
- Reemplazo completo de `alert()`, `confirm()` y `prompt()` en el script [app.js](file:///c:/Users/HP8D8/OneDrive/Desktop/Markdown/app.js).
- Configuración de la cabecera en [index.html](file:///c:/Users/HP8D8/OneDrive/Desktop/Markdown/index.html) para inyectar scripts de SweetAlert2.

---

## [1.0.0] - 2026-08-10

### Añadido
- Estructura base HTML y diseño CSS inicial de la intranet escolar.
- Sistema de autenticación de prueba simulada por roles (administrador, docente y alumno).
- Tablas interactivas para visualización de usuarios y calificaciones.
- Funcionalidad de bajas y edición rápida de usuarios en el Panel Admin.
