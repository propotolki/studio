import { createHmac } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/server/supabase';

function verifyVkPay(signature: string, payload: string) {
  const secret = process.env.VK_PAY_SECRET;
  if (!secret) return false;
  const expected = createHmac('sha256', secret).update(payload).digest('hex');
  return expected === signature;
}

export async function POST(req: NextRequest) {
  const payloadText = await req.text();
  const signature = req.headers.get('x-vkpay-sign') ?? '';
  if (!verifyVkPay(signature, payloadText)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const payload = JSON.parse(payloadText) as {
    booking_id: string;
    payment_id: string;
    status: 'paid' | 'failed' | 'refunded';
  };

  const paymentStatus = payload.status === 'paid' ? 'paid' : payload.status === 'refunded' ? 'refunded' : 'failed';
  const bookingStatus = payload.status === 'paid' ? 'confirmed' : 'cancelled';

  await supabaseAdmin
    .from('payments')
    .update({ status: paymentStatus, provider_payment_id: payload.payment_id, raw_payload: payload })
    .eq('booking_id', payload.booking_id)
    .eq('provider', 'vkpay');

  await supabaseAdmin.from('bookings').update({ status: bookingStatus }).eq('id', payload.booking_id);

  return NextResponse.json({ ok: true });
}
