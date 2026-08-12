# CLAUDE.md — Memoria del Agente

## Contexto
Intranet escolar para un colegio o institución educativa pública. Permite a administradores, docentes y estudiantes/familias realizar gestiones y consultas internas dentro de un entorno web integrado.
- **Stack:** HTML5, CSS3 vanilla y JavaScript moderno (ES6+), integrado con SweetAlert2 CDN para diálogos y avisos de usuario.

## Requerimientos
- Autenticación simulada por roles (administrador, docente, estudiante/familia).
- Gestión de usuarios (alta, baja y edición de personas).
- Módulo académico (registro de calificaciones por parte de docentes, consulta por estudiantes).
- Tablón de comunicados oficiales visible para los usuarios autenticados.
- Visualización de datos segmentada según el rol cargado.

## Reglas
- Código escrito en JavaScript modular y limpio.
- Nombres de variables y funciones descriptivos (camelCase).
- Uso de CSS estructurado con variables personalizadas (`:root`).
- Confirmaciones y alertas estilizadas en lugar de las nativas del navegador.

## Restricciones
- **IMPORTANTE:** No uses alerts nativos, usa SweetAlert2. Si no está instalado, instálalo (ya integrado vía CDN).
- Evitar exponer contraseñas en texto plano en interfaces públicas.
- No utilizar librerías de alertas pesadas ni complementos no especificados.

## Objetivos
- Mantener una interfaz de usuario limpia, accesible y moderna.
- Asegurar que el flujo de trabajo del usuario no sea interrumpido de manera intrusiva (uso de toasts no bloqueantes para éxitos).
- Garantizar que la documentación técnica en Markdown sea completa, consistente y legible en crudo.

## Memoria del proyecto
- **2026-08:** Se eliminaron las alertas nativas que bloqueaban el hilo principal del navegador. Se reemplazaron por `Swal.fire` (ventanas modales e inputs) y toasts SweetAlert2 para acciones exitosas (como guardar notas o dar de baja/actualizar usuarios) para optimizar el flujo de trabajo.

## Buenas prácticas
- Estructurar el código HTML con elementos semánticos de HTML5.
- Documentar el "por qué" de las decisiones complejas directamente en los archivos de documentación.
- Ser consistente en el estilo de formato Markdown (GFM).