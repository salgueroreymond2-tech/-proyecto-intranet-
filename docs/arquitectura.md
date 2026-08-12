# Arquitectura y Decisiones Técnicas

Este documento detalla la arquitectura del sistema, el stack tecnológico y las decisiones técnicas tomadas para el desarrollo del prototipo de Intranet Escolar.

---

## 🛠️ Stack Tecnológico

El proyecto está diseñado bajo un enfoque de **aplicación de página única simulada (SPA)** cargada completamente desde el lado del cliente, maximizando la ligereza y portabilidad:

1. **Estructura (HTML5):** Uso de etiquetas semánticas (`<header>`, `<main>`, `<section>`, `<article>`) para estructurar la página principal de manera accesible y legible.
2. **Estilo (CSS3 Vanilla):** Implementación de un sistema de variables personalizadas (`:root`) para colores corporativos, bordes y tipografías, permitiendo la adaptación responsive mediante Flexbox y Grid.
3. **Lógica de Control (JavaScript Moderno - ES6+):** Programación reactiva simple basada en la manipulación directa del DOM, escuchando eventos de formularios y renderizando dinámicamente tablas en tiempo real.
4. **Alertas e Interacción (SweetAlert2 CDN):** Diálogos web enriquecidos, estéticamente modernos, no bloqueantes del hilo principal de ejecución.

---

## 📂 Estructura del Proyecto

El código fuente y la documentación técnica se organizan de la siguiente manera:

```text
├── .git/                  # Historial de control de versiones
├── docs/                  # Documentación técnica avanzada
│   ├── arquitectura.md    # Decisiones y stack técnico
│   └── requerimientos.md  # Listas de requerimientos y tareas
├── AGENTS.md              # Memoria técnica del agente de IA (CLAUDE.md)
├── README.md              # Presentación general e instalación rápida
├── CONTRIBUTING.md        # Guía para colaboración en el código
├── CHANGELOG.md           # Historial de versiones y cambios del código
├── index.html             # Interfaz de usuario (HTML)
├── styles.css             # Estilos de la aplicación (CSS)
└── app.js                 # Lógica de negocio e interacción (JS)
```

---

## 💾 Gestión de Estado y Datos

Dado que se trata de un prototipo interactivo sin persistencia en base de datos externa:
- Los datos de usuario se almacenan temporalmente en un objeto literal (`usuariosRegistrados`) en memoria de ejecución.
- La tabla de notas académicas se alimenta directamente insertando elementos HTML (`<tr>`) al DOM tras enviar el formulario del docente.
- Al cerrar sesión o recargar la pestaña, los valores añadidos regresan a su estado base de prueba.
