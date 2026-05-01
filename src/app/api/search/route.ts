import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/server/supabase';

function scoreListing(item: { title: string; city: string; price_per_night: number }, q: string) {
  const query = q.toLowerCase();
  let score = 0;
  if (item.title.toLowerCase().includes(query)) score += 5;
  if (item.city.toLowerCase().includes(query)) score += 3;
  score += Math.max(0, 2 - Number(item.price_per_night) / 10000);
  return score;
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const city = params.get('city');
  const q = params.get('q') ?? '';
  const minPrice = Number(params.get('minPrice') ?? 0);
  const maxPrice = Number(params.get('maxPrice') ?? 1_000_000);
  const sort = params.get('sort') ?? 'recommended';

  let query = supabaseAdmin
    .from('listings')
    .select('id,title,city,price_per_night,status,created_at')
    .eq('status', 'active')
    .gte('price_per_night', minPrice)
    .lte('price_per_night', maxPrice)
    .limit(300);

  if (city) query = query.ilike('city', `%${city}%`);
  if (q) query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%,city.ilike.%${q}%`);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const list = data ?? [];

  if (sort === 'recommended') {
    const ranked = list
      .map((item: { title: string; city: string; price_per_night: number } & Record<string, any>) => ({ ...item, rank: scoreListing(item, q || item.city) }))
      .sort((a: { rank: number }, b: { rank: number }) => b.rank - a.rank);
    return NextResponse.json({ data: ranked });
  }

  if (sort === 'price_asc') list.sort((a: any, b: any) => Number(a.price_per_night) - Number(b.price_per_night));
  if (sort === 'price_desc') list.sort((a: any, b: any) => Number(b.price_per_night) - Number(a.price_per_night));

  return NextResponse.json({ data: list });
}
