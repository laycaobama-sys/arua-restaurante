import { NextRequest, NextResponse } from 'next/server'

// Configuración de Supabase
const supabaseUrl = 'https://kofjefrzijzwejuaryjy.supabase.co'
const supabaseKey = 'sb_publishable_ZQuRghep-m7l7M6PXnVJIg_7JRK6oLE'

// Verificar si la clave parece válida
const isValidSupabaseKey = supabaseKey.startsWith('eyJ')

// Verificar estado de la base de datos
export async function GET(request: NextRequest) {
  try {
    // Si la clave no tiene el formato correcto
    if (!isValidSupabaseKey) {
      return NextResponse.json({ 
        success: false, 
        connected: false,
        tableExists: false,
        error: 'La clave de Supabase no tiene el formato correcto',
        message: 'Las claves de Supabase deben empezar con "eyJ" (son JWTs)',
        instructions: {
          step1: 'Ve a https://supabase.com/dashboard',
          step2: 'Selecciona tu proyecto',
          step3: 'Ve a Settings > API',
          step4: 'Copia la clave "anon public" (empieza con eyJ...)',
          step5: 'Actualiza el archivo /src/app/api/reservations/route.ts con la clave correcta'
        }
      })
    }
    
    // Probar conexión
    const response = await fetch(`${supabaseUrl}/rest/v1/reservations?select=id&limit=1`, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      return NextResponse.json({ 
        success: true, 
        connected: true,
        tableExists: true,
        message: 'Conexión exitosa a Supabase'
      })
    }
    
    if (response.status === 404) {
      return NextResponse.json({ 
        success: true, 
        connected: true,
        tableExists: false,
        message: 'Conectado a Supabase pero la tabla de reservas no existe',
        createTableSQL: `
-- Ejecuta este SQL en el SQL Editor de Supabase:

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

-- Política para permitir todas las operaciones (para desarrollo)
CREATE POLICY "Allow all" ON public.reservations FOR ALL USING (true) WITH CHECK (true);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_reservations_date ON public.reservations(date);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON public.reservations(status);
        `
      })
    }
    
    return NextResponse.json({ 
      success: false, 
      connected: false,
      tableExists: false,
      error: `Error de conexión: ${response.status}`,
      message: 'No se pudo conectar a Supabase'
    })
    
  } catch (error: any) {
    console.error('Error checking database:', error)
    return NextResponse.json({ 
      success: false, 
      connected: false,
      tableExists: false,
      error: error.message 
    })
  }
}
