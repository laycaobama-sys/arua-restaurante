# Instrucciones para crear la tabla de reservas en Supabase

## Paso 1: Ir al panel de Supabase
1. Abre https://supabase.com/dashboard
2. Selecciona tu proyecto

## Paso 2: Ir al SQL Editor
1. En el menú lateral, haz clic en "SQL Editor"
2. Haz clic en "New query"

## Paso 3: Ejecutar el siguiente SQL

```sql
-- Crear tabla de reservas
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

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir todas las operaciones (para demo)
CREATE POLICY "Allow all operations" ON public.reservations
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Crear índice para búsquedas por fecha
CREATE INDEX IF NOT EXISTS idx_reservations_date ON public.reservations(date);

-- Crear índice para búsquedas por estado
CREATE INDEX IF NOT EXISTS idx_reservations_status ON public.reservations(status);
```

## Paso 4: Verificar
1. Ve a "Table Editor" en el menú lateral
2. Deberías ver la tabla "reservations"

## Notas importantes
- La clave que me diste (`sb_publishable_...`) es una clave pública
- Las claves públicas no pueden crear tablas (por seguridad)
- Una vez creada la tabla, el sistema de reservas funcionará automáticamente
- Las reservas se guardarán en Supabase y podrás verlas en el Table Editor

## Estructura de la tabla

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | TEXT | Código único de reserva (ej: AR1ABC2DEF) |
| name | TEXT | Nombre del cliente |
| phone | TEXT | Teléfono de contacto |
| email | TEXT | Email (opcional) |
| date | TEXT | Fecha de la reserva |
| time | TEXT | Hora de la reserva |
| guests | INTEGER | Número de personas |
| occasion | TEXT | Ocasión especial (opcional) |
| requests | TEXT | Comentarios (opcional) |
| status | TEXT | Estado: confirmed, cancelled, completed |
| created_at | TIMESTAMP | Fecha de creación |
