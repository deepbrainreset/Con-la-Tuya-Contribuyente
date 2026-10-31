# SECURITY_AUDIT.md
## Informe de Auditoría de Ciberseguridad y Resiliencia Operativa

**Archivos auditados:** [`server.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/server.ts), [`package.json`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/package.json), [`.gitignore`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/.gitignore), y componentes React en `src/`.

---

## 1. Controles de Seguridad Verificados en `server.ts`

1. **Cabeceras de Seguridad HTTP Endurecidas:**
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: geolocation=(), microphone=(), camera=()`
   - `Cross-Origin-Opener-Policy: same-origin`
   - `Content-Security-Policy (CSP)`: Restringe `default-src 'self'`, `frame-ancestors 'none'`, `base-uri 'self'`, `object-src 'none'`, permitiendo únicamente orígenes explícitos para teselas cartográficas (`tile.openstreetmap.org`, `basemaps.cartocdn.com`) y APIs oficiales (`apis.datos.gob.ar`).
2. **Política CORS de Lista Blanca Estricta:**
   - Solo permite orígenes autorizados (`https://conlatuyacontribuyente.com`, `https://www.conlatuyacontribuyente.com`, y `localhost` en entorno de desarrollo).
3. **Limitación de Tasa por IP (`Rate Limiting`):**
   - Implementado mediante `createRateLimiter` en [`server.ts`](file:///G:/Mi%20unidad/Proyectos/Con%20la%20tuya/server.ts):
     - `/api/visits/increment`: máximo 20 solicitudes por minuto por IP (`HTTP 429` + cabecera `Retry-After`).
     - `/api/censo/localidades` y `/api/georef/*`: máximo 60 solicitudes por minuto por IP con caché en memoria de 7 días para prevenir agotamiento de cuota ante la API nacional Georef.
4. **Higiene de Secretos y Credenciales:**
   - Verificado que no existen claves privadas, tokens ni archivos `.env` versionados en el historial de Git.
   - Los enlaces externos abiertos en nueva pestaña utilizan `rel="noopener noreferrer"` para prevenir ataques de `tabnabbing`.
5. **Prevención de Inyección XSS:**
   - Ninguna vista del cliente utiliza `dangerouslySetInnerHTML` con entradas de usuario; todos los campos de búsqueda, filtros y generadores de consultas ciudadanas (Ley 27.275 e interpelaciones en X/Twitter) son escapados por React y `encodeURIComponent`.
