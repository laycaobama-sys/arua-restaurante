# ⚠️ IMPORTANTE: Configuración de Supabase

## El Problema
La clave que proporcionaste (`sb_publishable_ZQuRghep-m7l7M6PXnVJIg_7JRK6oLE`) **no tiene el formato correcto** para Supabase.

Las claves de API de Supabase son JWTs que **empiezan con `eyJ`** (por ejemplo: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Cómo obtener la clave correcta

### Paso 1: Ir al panel de Supabase
1. Abre https://supabase.com/dashboard
2. Selecciona tu proyecto (kofjefrzijzwejuaryjy)

### Paso 2: Obtener las credenciales
1. En el menú lateral, ve a **Settings** (⚙️)
2. Haz clic en **API**
3. Verás dos claves:
   - **anon public**: Esta es la clave que necesitas (empieza con `eyJ`)
   - **service_role**: Esta es la clave de administrador (NO la uses en el frontend)

### Paso 3: Actualizar el código
Copia la clave **anon public** y actualiza estos archivos:

**Archivo 1:** `/src/app/api/reservations/route.ts`
```typescript
const supabaseKey = 'TU_CLAVE_ANON_AQUI'  // Pegar aquí
```

**Archivo 2:** `/src/app/api/init-db/route.ts`
```typescript
const supabaseKey = 'TU_CLAVE_ANON_AQUI'  // Pegar aquí
```

## Crear la tabla de reservas

Una vez que tengas la clave correcta, necesitas crear la tabla:

### Paso 1: Ir al SQL Editor
1. En el panel de Supabase, ve a **SQL Editor**
2. Haz clic en **New query**

### Paso 2: Ejecutar este SQL
```sql
CREATE TABLE IF NOT EXISTS public.reservations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  guests INTEGER NOT NULL,
  occasion TEXT,
  requests TEXT,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Política para permitir todas las operaciones (desarrollo)
CREATE POLICY "Allow all" ON public.reservations FOR ALL USING (true) WITH CHECK (true);

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_reservations_date ON public.reservations(date);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON public.reservations(status);
```

### Paso 3: Verificar
1. Ve a **Table Editor**
2. Deberías ver la tabla `reservations`

## Mientras tanto...
El sistema de reservas funcionará en **modo offline**:
- Las reservas se confirmarán por WhatsApp
- El código de reserva se generará igualmente
- El cliente recibirá confirmación instantánea

Una vez configurado Supabase correctamente, todas las reservas se guardarán automáticamente en la base de datos.

## Resumen de archivos
- `/src/app/api/reservations/route.ts` - API para crear/ver reservas
- `/src/app/api/init-db/route.ts` - Verifica conexión a Supabase
- `/SUPABASE_SETUP.md` - Este archivo

## URLs importantes
- **Sitio web**: https://arua-restaurante.netlify.app
- **GitHub**: https://github.com/laycaobama-sys/arua-restaurante
- **Supabase**: https://supabase.com/dashboard
