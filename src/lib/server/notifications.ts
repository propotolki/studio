import { supabaseAdmin } from '@/lib/server/supabase';

export async function createNotification(userId: string, title: string, body: string) {
  await supabaseAdmin.from('notifications').insert({ user_id: userId, title, body, status: 'queued' });
}
