# Guía de Contribución

¡Gracias por interesarte en colaborar en el desarrollo de la Intranet Escolar! Para mantener la consistencia del código y la documentación, sigue estas pautas y flujos de trabajo.

---

## 🌿 Flujo de Ramas (Git Branching)

Trabajamos utilizando una versión simplificada de Git Flow. Toda contribución debe pasar por una rama de funcionalidad antes de integrarse en la rama principal.

* **`main` / `master`**: Contiene la versión de producción estable y funcional.
* **`feature/nombre-de-la-tarea`**: Ramas de desarrollo creadas a partir de `main` para implementar nuevas funcionalidades o solucionar fallos. Ejemplos:
  * `feature/login-sweetalert`
  * `feature/modulo-comunicados`

---

## ✉️ Formato de Commits

Para mantener el historial del repositorio legible e informativo, los mensajes de commit deben seguir el siguiente formato semántico:

* `feat: ...` — Para nuevas características o funcionalidades.
* `fix: ...` — Para corrección de errores en el código.
* `docs: ...` — Para cambios exclusivos en la documentación Markdown.
* `style: ...` — Para mejoras estéticas o de estilos CSS sin alterar funcionalidad.
* `refactor: ...` — Para reestructuraciones de código que no corrigen errores ni añaden funciones.

*Ejemplo:*
```bash
git commit -m "feat: integrar SweetAlert2 para el login"
git commit -m "docs: actualizar el manual de requerimientos"
```

---

## 🔎 Revisión de Pull Requests (PR)

Antes de fusionar una rama en `main`:
1. Asegúrate de que no haya conflictos con la rama principal.
2. Verifica que no existan alertas `alert()` nativas que corten el flujo de trabajo (debe usarse SweetAlert2).
3. Pide la revisión de al menos un compañero del equipo de desarrollo.
4. Una vez aprobado, realiza la fusión utilizando `Merge` o `Squash`.
