import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: add user management, role changes, ban/unban, KYC statuses.
  return NextResponse.json({ data: [], message: 'Admin user management placeholder.' });
}
