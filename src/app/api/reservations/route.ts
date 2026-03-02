import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Configuración de Supabase
const supabaseUrl = 'https://kofjefrzijzwejuaryjy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvZmplZnJ6aWp6d2VqdWFyeWp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0ODExMjcsImV4cCI6MjA4ODA1NzEyN30.hX3AAU5Bp6uRUXCFCEtV-kNgRh8sYE4OXAMMgVje2d4'

const supabase = createClient(supabaseUrl, supabaseKey)

// Configuración de Resend (API Key necesaria)
// Obtener una gratis en: https://resend.com/api-keys
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_123456789'

// Email del restaurante (donde llegarán las notificaciones)
const RESTAURANT_EMAIL = 'arua.restaurante@gmail.com'

// Función para enviar email de confirmación al cliente
async function sendConfirmationEmail(reservation: any) {
  const resend = new Resend(RESEND_API_KEY)
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #0a0a0a; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 16px; overflow: hidden; border: 1px solid #c9a227; }
        .header { background: linear-gradient(135deg, #c9a227, #e3c453); padding: 30px; text-align: center; }
        .header h1 { color: #000; margin: 0; font-size: 28px; }
        .header p { color: #000; margin: 10px 0 0; opacity: 0.8; }
        .content { padding: 30px; color: #fff; }
        .code-box { background: #c9a227; color: #000; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0; }
        .code-box h2 { margin: 0; font-size: 32px; letter-spacing: 3px; }
        .details { background: #0a0a0a; padding: 20px; border-radius: 10px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #2a2a2a; }
        .detail-label { color: #909090; }
        .detail-value { color: #fff; font-weight: 600; }
        .footer { text-align: center; padding: 20px; color: #606060; font-size: 12px; }
        .footer a { color: #c9a227; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🍽️ A RÚA</h1>
          <p>Restaurante Gallego y Canalla</p>
        </div>
        <div class="content">
          <h2 style="color: #c9a227; margin-top: 0;">¡Reserva Confirmada!</h2>
          <p>Hola ${reservation.name},</p>
          <p>Tu reserva ha sido confirmada exitosamente. Te esperamos en A Rúa.</p>
          
          <div class="code-box">
            <p style="margin: 0; font-size: 14px; color: #000;">TU CÓDIGO DE RESERVA</p>
            <h2>${reservation.id}</h2>
          </div>
          
          <div class="details">
            <h3 style="color: #c9a227; margin-top: 0;">📋 Detalles de tu reserva</h3>
            <div class="detail-row">
              <span class="detail-label">📅 Fecha</span>
              <span class="detail-value">${formatDate(reservation.date)}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">🕐 Hora</span>
              <span class="detail-value">${reservation.time}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">👥 Personas</span>
              <span class="detail-value">${reservation.guests} ${reservation.guests === 1 ? 'persona' : 'personas'}</span>
            </div>
            ${reservation.occasion ? `
            <div class="detail-row">
              <span class="detail-label">🎉 Ocasión</span>
              <span class="detail-value">${reservation.occasion}</span>
            </div>
            ` : ''}
            ${reservation.requests ? `
            <div class="detail-row">
              <span class="detail-label">💬 Comentarios</span>
              <span class="detail-value">${reservation.requests}</span>
            </div>
            ` : ''}
          </div>
          
          <p><strong>📍 Dirección:</strong> C. del Príncipe Carlos, 50, Hortaleza, Madrid</p>
          <p><strong>📞 Teléfono:</strong> 911 66 16 41</p>
          
          <p style="background: #2a2a2a; padding: 15px; border-radius: 8px; font-size: 14px;">
            ⚠️ Presenta este código al llegar al restaurante. Si necesitas cancelar o modificar tu reserva, llámanos al 911 66 16 41.
          </p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} A Rúa Restaurante - Grupo Do Meigo</p>
          <p>Un trocito de Galicia en Madrid</p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const { data, error } = await resend.emails.send({
      from: 'A Rúa Restaurante <onboarding@resend.dev>',
      to: reservation.email,
      subject: `✅ Reserva Confirmada - ${reservation.id} | A Rúa`,
      html: htmlContent,
    })
    
    if (error) {
      console.error('Error sending confirmation email:', error)
      return { success: false, error: error.message }
    }
    
    console.log('✅ Confirmation email sent:', data)
    return { success: true, data }
  } catch (error: any) {
    console.error('Error sending confirmation email:', error)
    return { success: false, error: error.message }
  }
}

// Función para enviar notificación al restaurante
async function sendRestaurantNotification(reservation: any) {
  const resend = new Resend(RESEND_API_KEY)
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; }
        .header { background: #c9a227; padding: 20px; text-align: center; }
        .header h1 { color: #000; margin: 0; }
        .content { padding: 20px; }
        .code-box { background: #000; color: #c9a227; padding: 15px; border-radius: 8px; text-align: center; margin: 15px 0; }
        .details { background: #f9f9f9; padding: 15px; border-radius: 8px; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🍽️ NUEVA RESERVA</h1>
        </div>
        <div class="content">
          <div class="code-box">
            <h2 style="margin: 0;">${reservation.id}</h2>
          </div>
          
          <div class="details">
            <div class="detail-row">
              <strong>👤 Cliente:</strong>
              <span>${reservation.name}</span>
            </div>
            <div class="detail-row">
              <strong>📱 Teléfono:</strong>
              <span>${reservation.phone}</span>
            </div>
            <div class="detail-row">
              <strong>📧 Email:</strong>
              <span>${reservation.email}</span>
            </div>
            <div class="detail-row">
              <strong>📅 Fecha:</strong>
              <span>${formatDate(reservation.date)}</span>
            </div>
            <div class="detail-row">
              <strong>🕐 Hora:</strong>
              <span>${reservation.time}</span>
            </div>
            <div class="detail-row">
              <strong>👥 Personas:</strong>
              <span>${reservation.guests}</span>
            </div>
            ${reservation.occasion ? `
            <div class="detail-row">
              <strong>🎉 Ocasión:</strong>
              <span>${reservation.occasion}</span>
            </div>
            ` : ''}
            ${reservation.requests ? `
            <div class="detail-row">
              <strong>💬 Comentarios:</strong>
              <span>${reservation.requests}</span>
            </div>
            ` : ''}
          </div>
          
          <p style="text-align: center; color: #666; font-size: 12px; margin-top: 20px;">
            Recibido: ${new Date().toLocaleString('es-ES')}
          </p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const { data, error } = await resend.emails.send({
      from: 'A Rúa Reservas <onboarding@resend.dev>',
      to: RESTAURANT_EMAIL,
      subject: `🍽️ Nueva Reserva ${reservation.id} - ${reservation.name} | ${reservation.date} ${reservation.time}`,
      html: htmlContent,
    })
    
    if (error) {
      console.error('Error sending restaurant notification:', error)
      return { success: false, error: error.message }
    }
    
    console.log('✅ Restaurant notification sent:', data)
    return { success: true, data }
  } catch (error: any) {
    console.error('Error sending restaurant notification:', error)
    return { success: false, error: error.message }
  }
}

// Formatear fecha
function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  return date.toLocaleDateString('es-ES', options)
}

// GET - Obtener todas las reservas
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    
    let query = supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (date) {
      query = query.eq('date', date)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    
    return NextResponse.json({ 
      success: true, 
      reservations: data 
    })
  } catch (error: any) {
    console.error('Error fetching reservations:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}

// POST - Crear nueva reserva y enviar emails
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, date, time, guests, occasion, requests } = body
    
    // Validar campos requeridos
    if (!name || !phone || !email || !date || !time || !guests) {
      return NextResponse.json({ 
        success: false, 
        error: 'Faltan campos requeridos. Nombre, teléfono, email, fecha y hora son obligatorios.' 
      }, { status: 400 })
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        success: false, 
        error: 'El email no es válido' 
      }, { status: 400 })
    }
    
    // Generar ID único
    const id = 'AR' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase()
    
    // Crear objeto de reserva
    const reservation = {
      id,
      name,
      phone,
      email,
      date,
      time,
      guests: parseInt(guests),
      occasion: occasion || null,
      requests: requests || null,
      status: 'confirmed',
      created_at: new Date().toISOString()
    }
    
    // Insertar en Supabase
    const { data, error } = await supabase
      .from('reservations')
      .insert([reservation])
      .select()
    
    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ 
        success: false, 
        error: 'Error al guardar la reserva: ' + error.message 
      }, { status: 500 })
    }
    
    console.log('✅ Reserva guardada en Supabase:', id)
    
    // Enviar emails de confirmación
    const emailResult = await sendConfirmationEmail(reservation)
    const notificationResult = await sendRestaurantNotification(reservation)
    
    return NextResponse.json({ 
      success: true, 
      reservation: data?.[0] || reservation,
      emailSent: emailResult.success,
      notificationSent: notificationResult.success,
      emailError: emailResult.success ? null : emailResult.error
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
