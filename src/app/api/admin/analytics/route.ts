import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/server/supabase';

export async function GET() {
  const [listingsRes, bookingsRes, paymentsRes, disputesRes] = await Promise.all([
    supabaseAdmin.from('listings').select('id,status'),
    supabaseAdmin.from('bookings').select('id,status,total_price'),
    supabaseAdmin.from('payments').select('id,status,amount'),
    supabaseAdmin.from('disputes').select('id,status'),
  ]);

  const listings = listingsRes.data ?? [];
  const bookings = bookingsRes.data ?? [];
  const payments = paymentsRes.data ?? [];
  const disputes = disputesRes.data ?? [];

  const gmV = bookings
    .filter((x: any) => x.status === 'confirmed' || x.status === 'completed')
    .reduce((acc: number, x: any) => acc + Number(x.total_price ?? 0), 0);

  const paidAmount = payments
    .filter((x: any) => x.status === 'paid')
    .reduce((acc: number, x: any) => acc + Number(x.amount ?? 0), 0);

  return NextResponse.json({
    data: {
      listingsTotal: listings.length,
      listingsPending: listings.filter((x: any) => x.status === 'pending').length,
      bookingsTotal: bookings.length,
      bookingsConfirmed: bookings.filter((x: any) => x.status === 'confirmed' || x.status === 'completed').length,
      disputesOpen: disputes.filter((x: any) => x.status === 'open').length,
      gmV,
      paidAmount,
    },
  });
}
