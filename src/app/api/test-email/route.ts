import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_8vVUxGaV_PwSSg5akVBxMJG3cGvppjjyC'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  
  if (!email) {
    return NextResponse.json({ 
      success: false, 
      error: 'Email parameter required. Use ?email=your@email.com' 
    }, { status: 400 })
  }

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
        .content { padding: 30px; color: #fff; text-align: center; }
        .success { color: #4ade80; font-size: 48px; }
        .footer { text-align: center; padding: 20px; color: #606060; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🍽️ A RÚA</h1>
          <p>Restaurante Gallego y Canalla</p>
        </div>
        <div class="content">
          <p class="success">✅</p>
          <h2 style="color: #c9a227;">¡Email de Prueba!</h2>
          <p>Si estás viendo este mensaje, el sistema de envío de emails está funcionando correctamente.</p>
          <p style="background: #2a2a2a; padding: 15px; border-radius: 8px; font-size: 14px; color: #909090;">
            Este es un email de prueba enviado desde el sistema de reservas de A Rúa Restaurante.
          </p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} A Rúa Restaurante - Grupo Do Meigo</p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const { data, error } = await resend.emails.send({
      from: 'A Rúa Restaurante <onboarding@resend.dev>',
      to: email,
      subject: '✅ Email de Prueba - Sistema Funcionando | A Rúa',
      html: htmlContent,
    })
    
    if (error) {
      console.error('Error sending test email:', error)
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        details: error
      }, { status: 500 })
    }
    
    console.log('✅ Test email sent:', data)
    return NextResponse.json({ 
      success: true, 
      message: `Email de prueba enviado a ${email}`,
      data: data
    })
  } catch (error: any) {
    console.error('Error sending test email:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body
    
    if (!email) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email es requerido' 
      }, { status: 400 })
    }

    const resend = new Resend(RESEND_API_KEY)
    
    // Simular una reserva de prueba
    const testReservation = {
      id: 'TEST' + Date.now().toString(36).toUpperCase(),
      name: 'Cliente de Prueba',
      email: email,
      phone: '600000000',
      date: new Date().toISOString().split('T')[0],
      time: '21:00',
      guests: 2,
      occasion: 'Prueba del sistema',
      requests: 'Este es un email de prueba'
    }
    
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
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🍽️ A RÚA</h1>
            <p>Restaurante Gallego y Canalla</p>
          </div>
          <div class="content">
            <h2 style="color: #c9a227; margin-top: 0;">¡Reserva Confirmada! (PRUEBA)</h2>
            <p>Hola ${testReservation.name},</p>
            <p>Este es un email de prueba para verificar que el sistema de confirmaciones está funcionando.</p>
            
            <div class="code-box">
              <p style="margin: 0; font-size: 14px; color: #000;">TU CÓDIGO DE RESERVA</p>
              <h2>${testReservation.id}</h2>
            </div>
            
            <div class="details">
              <h3 style="color: #c9a227; margin-top: 0;">📋 Detalles de tu reserva</h3>
              <div class="detail-row">
                <span class="detail-label">📅 Fecha</span>
                <span class="detail-value">${testReservation.date}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">🕐 Hora</span>
                <span class="detail-value">${testReservation.time}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">👥 Personas</span>
                <span class="detail-value">${testReservation.guests} personas</span>
              </div>
            </div>
            
            <p><strong>📍 Dirección:</strong> C. del Príncipe Carlos, 50, Hortaleza, Madrid</p>
            <p><strong>📞 Teléfono:</strong> 911 66 16 41</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} A Rúa Restaurante - Grupo Do Meigo</p>
            <p>Un trocito de Galicia en Madrid</p>
          </div>
        </div>
      </body>
      </html>
    `

    const { data, error } = await resend.emails.send({
      from: 'A Rúa Restaurante <onboarding@resend.dev>',
      to: email,
      subject: `✅ Email de Prueba - ${testReservation.id} | A Rúa`,
      html: htmlContent,
    })
    
    if (error) {
      console.error('Error sending test email:', error)
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 })
    }
    
    console.log('✅ Test reservation email sent:', data)
    return NextResponse.json({ 
      success: true, 
      message: `Email de prueba enviado a ${email}`,
      reservation: testReservation,
      emailData: data
    })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}
