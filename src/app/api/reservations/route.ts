import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Configuración de Supabase
const supabaseUrl = 'https://kofjefrzijzwejuaryjy.supabase.co'
const supabaseKey = 'sb_publishable_ZQuRghep-m7l7M6PXnVJIg_7JRK6oLE'

// Verificar si la clave es válida (debe empezar con eyJ para ser JWT de Supabase)
const isSupabaseConfigured = supabaseKey.startsWith('eyJ')

const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseKey) : null

// GET - Obtener todas las reservas
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    
    // Si Supabase no está configurado correctamente, usar datos locales
    if (!supabase) {
      return NextResponse.json({ 
        success: true, 
        reservations: [],
        message: 'Supabase no está configurado. Necesitas configurar las credenciales correctas.',
        needsSetup: true,
        instructions: 'Ve a /api/setup-instructions para ver cómo configurar Supabase'
      })
    }
    
    let query = supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (date) {
      query = query.eq('date', date)
    }
    
    const { data, error } = await query
    
    if (error) {
      // Si la tabla no existe
      if (error.code === '42P01' || error.message?.includes('Could not find')) {
        return NextResponse.json({ 
          success: true, 
          reservations: [],
          message: 'La tabla de reservas no existe en Supabase',
          needsTable: true,
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

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON public.reservations FOR ALL USING (true) WITH CHECK (true);
          `
        })
      }
      throw error
    }
    
    return NextResponse.json({ 
      success: true, 
      reservations: data 
    })
  } catch (error: any) {
    console.error('Error fetching reservations:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      reservations: []
    }, { status: 500 })
  }
}

// POST - Crear nueva reserva
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, date, time, guests, occasion, requests } = body
    
    // Validar campos requeridos
    if (!name || !phone || !date || !time || !guests) {
      return NextResponse.json({ 
        success: false, 
        error: 'Faltan campos requeridos' 
      }, { status: 400 })
    }
    
    // Generar ID único
    const id = 'AR' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase()
    
    // Crear objeto de reserva
    const reservation = {
      id,
      name,
      phone,
      email: email || null,
      date,
      time,
      guests: parseInt(guests),
      occasion: occasion || null,
      requests: requests || null,
      status: 'confirmed',
      created_at: new Date().toISOString()
    }
    
    // Si Supabase no está configurado
    if (!supabase) {
      return NextResponse.json({ 
        success: true, 
        reservation,
        warning: 'Supabase no está configurado. La reserva se procesará pero no se guardará en base de datos.',
        needsSetup: true
      })
    }
    
    // Insertar en Supabase
    const { data, error } = await supabase
      .from('reservations')
      .insert([reservation])
      .select()
    
    if (error) {
      console.error('Supabase insert error:', error)
      
      // Si la tabla no existe
      if (error.code === '42P01' || error.message?.includes('Could not find')) {
        return NextResponse.json({ 
          success: true, 
          reservation,
          warning: 'La tabla de reservas no existe. Ejecuta el SQL en Supabase.',
          needsTable: true
        })
      }
      
      // Otros errores - devolver la reserva de todos modos
      return NextResponse.json({ 
        success: true, 
        reservation,
        warning: 'Error al guardar en base de datos: ' + error.message
      })
    }
    
    return NextResponse.json({ 
      success: true, 
      reservation: data?.[0] || reservation
    })
  } catch (error: any) {
    console.error('Error creating reservation:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}

// DELETE - Cancelar reserva
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: 'ID de reserva requerido' 
      }, { status: 400 })
    }
    
    if (!supabase) {
      return NextResponse.json({ 
        success: true, 
        message: 'Reserva cancelada (modo offline)' 
      })
    }
    
    const { error } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    return NextResponse.json({ 
      success: true, 
      message: 'Reserva cancelada' 
    })
  } catch (error: any) {
    console.error('Error deleting reservation:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}
