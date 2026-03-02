# 📧 Configuración de Emails - A Rúa Restaurante

## Estado Actual

✅ Sistema de reservas funcionando
✅ Base de datos Supabase conectada
⚠️ Emails limitados al propietario de la cuenta de Resend

## ⚠️ IMPORTANTE: Verificar Dominio en Resend

El dominio de prueba `onboarding@resend.dev` **SOLO permite enviar emails al propietario de la cuenta**.

### Para enviar emails a cualquier cliente, necesitas:

1. **Ir a Resend Dashboard**: https://resend.com/domains
2. **Agregar un dominio**:
   - Puedes usar un subdominio como `mail.arua-restaurante.com`
   - O el dominio principal si tienes uno

3. **Configurar los registros DNS** que Resend te indicará:
   - Registro MX
   - Registro TXT (SPF)
   - Registro TXT (DKIM)

4. **Cambiar el `from` address** en el código una vez verificado:
   ```
   De: 'A Rúa Restaurante <onboarding@resend.dev>'
   A:  'A Rúa Restaurante <reservas@tu-dominio-verificado.com>'
   ```

## Opciones Rápidas

### Opción 1: Verificar dominio propio (Recomendado)
Si tienes un dominio para el restaurante, verifícalo en Resend.

### Opción 2: Usar correo del propietario temporalmente
Mientras verificas el dominio, los emails de prueba llegarán a:
- **laycaobama@gmail.com** (propietario de la cuenta Resend)

## Cómo Probar

1. Haz una reserva con el email `laycaobama@gmail.com`
2. Verifica que llega el email de confirmación
3. Una vez verificado el dominio, funcionará con cualquier email

## Archivos Modificados

- `/src/app/api/reservations/route.ts` - API de reservas con emails
- `/src/app/api/test-email/route.ts` - Endpoint de prueba

## API Keys Configuradas

- ✅ Supabase: Conectado
- ✅ Resend: `re_8vVUxGaV_...` (activa)
