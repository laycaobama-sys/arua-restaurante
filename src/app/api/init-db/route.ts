import { NextRequest, NextResponse } from 'next/server'

// Configuración de Supabase
const supabaseUrl = 'https://kofjefrzijzwejuaryjy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvZmplZnJ6aWp6d2VqdWFyeWp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0ODExMjcsImV4cCI6MjA4ODA1NzEyN30.hX3AAU5Bp6uRUXCFCEtV-kNgRh8sYE4OXAMMgVje2d4'

// Verificar estado de la base de datos
export async function GET(request: NextRequest) {
  try {
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
