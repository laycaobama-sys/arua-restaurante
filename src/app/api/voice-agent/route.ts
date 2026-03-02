import ZAI from 'z-ai-web-dev-sdk';
import { NextRequest, NextResponse } from 'next/server';

// System prompt para el agente de voz del restaurante
const SYSTEM_PROMPT = `Eres María, la recepcionista virtual del restaurante A Rúa, un restaurante gallego en Madrid. Tu voz es cálida, profesional y amigable.

INFORMACIÓN DEL RESTAURANTE:
- Nombre: A Rúa
- Dirección: C. del Príncipe Carlos, 50, Hortaleza, 28050 Madrid
- Teléfono: 911 66 16 41
- WhatsApp: 911 66 16 41
- Horario: Todos los días de 09:00 a 00:00
- Especialidad: Cocina gallega con un toque moderno
- Instagram: @arua.restaurante

PLATOS DESTACADOS:
- Pulpo Rockero (26,50€): Tierno, braseado con chispa especial
- Hummus de Garbanzo con Toppings Caseros (7,50€): Cremoso y delicioso
- Oreja en Témpura con Brava (12,00€): Crujiente y jugosa
- Gambones en Costra de Pimentón (16,90€): Ahumados al carbón

INSTRUCCIONES:
1. Saluda siempre de forma cálida y profesional
2. Responde de forma concisa y natural, máximo 2-3 frases
3. Si preguntan por reservas, ofrece las opciones disponibles
4. Si preguntan por horarios, da la información exacta
5. Si preguntan por la ubicación, da la dirección completa
6. Si preguntan por platos, recomienda los destacados
7. Si no sabes algo, ofrece conectar con el restaurante
8. Usa un tono cercano pero profesional
9. Habla en español de España de forma natural
10. NO digas que eres una IA o un bot - eres María, la recepcionista`;

// Instancia global del SDK
let zaiInstance: any = null;

async function getZAI() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

export async function POST(request: NextRequest) {
  try {
    const { text, conversationHistory = [] } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'No se proporcionó mensaje' }, { status: 400 });
    }

    const zai = await getZAI();

    // Construir historial de conversación
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: text }
    ];

    // Generar respuesta con el LLM
    const completion = await zai.chat.completions.create({
      messages: messages,
      temperature: 0.7,
      max_tokens: 200
    });

    const responseText = completion.choices[0]?.message?.content || 'Lo siento, no he podido entenderle. ¿Podría repetir?';

    // Generar audio con TTS
    try {
      const ttsResponse = await zai.audio.tts.create({
        input: responseText.substring(0, 500), // Limitar a 500 caracteres
        voice: 'tongtong',
        speed: 1.0,
        response_format: 'wav',
        stream: false
      });

      // Convertir Response a buffer
      const arrayBuffer = await ttsResponse.arrayBuffer();
      const audioBuffer = Buffer.from(new Uint8Array(arrayBuffer));
      const audioBase64 = audioBuffer.toString('base64');

      return NextResponse.json({
        success: true,
        text: responseText,
        audio: `data:audio/wav;base64,${audioBase64}`,
        transcription: text
      });
    } catch (ttsError) {
      // Si falla el TTS, devolver solo el texto
      console.error('TTS Error:', ttsError);
      return NextResponse.json({
        success: true,
        text: responseText,
        audio: null,
        transcription: text
      });
    }

  } catch (error: any) {
    console.error('Error en voice-agent:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'active',
    service: 'Agente de Voz A Rúa',
    voice: 'María - Español de España',
    features: ['LLM conversacional', 'TTS voz natural', 'Respuestas contextuales']
  });
}
