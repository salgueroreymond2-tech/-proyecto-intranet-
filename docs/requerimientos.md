# Especificación de Requerimientos

Este documento detalla la lista de requerimientos funcionales y no funcionales del sistema bajo la metodología de listas de tareas de Markdown.

---

## 📌 Requerimientos Funcionales

- [x] **Autenticación por Roles:**
  - [x] Login con credenciales de prueba predefinidas en memoria.
  - [x] Restricción de acceso para cargar entornos según rol (`admin`, `docente`, `estudiante`).
  - [x] Ocultar componentes de otras sesiones al cerrar la sesión actual.

- [x] **Gestión de Usuarios (Solo Administrador):**
  - [x] Visualización de la tabla completa de usuarios registrados.
  - [x] Creación de nuevos usuarios con rol específico asignado.
  - [x] Edición interactiva del nombre completo del usuario mediante modal personalizado.
  - [x] Baja/Eliminación lógica de usuarios del listado con confirmación SweetAlert2 (restringiendo la eliminación del usuario `admin` principal).

- [x] **Módulo Académico (Docentes, Estudiantes y Administrador):**
  - [x] Formulario para que el docente registre calificaciones indicando estudiante, materia y valor de la nota.
  - [x] Tabla de calificaciones acumuladas visible para los estudiantes en tiempo real tras ser guardadas.
  - [x] **[NUEVO]** Permiso exclusivo para que el administrador edite o elimine cualquier calificación registrada desde el Panel Admin.

- [x] **Tablón de Comunicados:**
  - [x] Panel de avisos y notificaciones de interés general de la institución escolar.
  - [x] **[NUEVO]** Permiso exclusivo para que el administrador cree, edite y elimine anuncios oficiales directamente sobre el tablón.

---

## ⚙️ Requerimientos No Funcionales

- [x] **Calidad de Interfaz (UX/UI):**
  - [x] Flujo de navegación limpio sin alertas nativas bloqueantes (`alert()`, `confirm()` y `prompt()`).
  - [x] Alertas informativas diseñadas como Toasts no intrusivos que no cortan la interacción.
  - [x] Contraste claro entre fondo de tarjetas y textos, alineado a un diseño web accesible.

- [x] **Seguridad de Datos:**
  - [x] Minimizar exposición de datos sensibles y contraseñas de menores de edad en campos de formularios públicos.

- [x] **Control de Versiones y Documentación:**
  - [x] Repositorio Git inicializado con control de cambios estructurado.
  - [x] Documentación de proyecto en Markdown siguiendo las especificaciones de GitHub Flavored Markdown (GFM).
