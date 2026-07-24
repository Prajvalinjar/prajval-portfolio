import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Basic Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message cannot be empty' }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    if (!supabaseAdmin) {
      // Graceful fallback when environment variables are not yet configured in local development
      console.warn('Supabase URL or keys not configured. Simulating successful save locally.');
      return NextResponse.json({
        success: true,
        message: 'Message received (Development Mode: Please configure .env.local to persist into Supabase).',
        simulated: true
      }, { status: 201 });
    }

    const { data, error } = await supabaseAdmin
      .from('messages')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          message: message.trim(),
          status: 'unread',
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error inserting message:', error);
      let userFriendlyError = error.message;
      if (error.message.includes('relation "public.messages" does not exist') || error.code === '42P01') {
        userFriendlyError = 'Database table "messages" not found. Please run the SQL setup script in your Supabase SQL Editor.';
      } else if (error.message.includes('apiKey') || error.message.includes('JWT') || error.code === 'PGRST301') {
        userFriendlyError = 'Invalid Supabase API keys in .env.local. Please check your Supabase Project Settings -> API.';
      }
      return NextResponse.json({ error: userFriendlyError }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent and stored successfully!',
      data: data?.[0]
    }, { status: 201 });

  } catch (err: any) {
    console.error('API Contact POST Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

// GET Endpoint to read messages for the admin
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const passcode = searchParams.get('passcode') || req.headers.get('x-admin-passcode');
  const expectedPasscode = process.env.ADMIN_PASSCODE || 'prajval_secret_2026';

  if (!passcode || passcode !== expectedPasscode) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  const supabaseAdmin = getSupabaseAdmin();

  if (!supabaseAdmin) {
    return NextResponse.json({
      messages: [],
      warning: 'Supabase is not configured yet in .env.local'
    }, { status: 200 });
  }

  const { data, error } = await supabaseAdmin
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ messages: data || [] }, { status: 200 });
}

// PATCH Endpoint to update message status (e.g., mark as read)
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { id, status, passcode } = body;
  const expectedPasscode = process.env.ADMIN_PASSCODE || 'prajval_secret_2026';

  if (!passcode || passcode !== expectedPasscode) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { data, error } = await supabaseAdmin
    .from('messages')
    .update({ status })
    .eq('id', id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data: data?.[0] }, { status: 200 });
}

// DELETE Endpoint to remove a message
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const passcode = searchParams.get('passcode') || req.headers.get('x-admin-passcode');
  const expectedPasscode = process.env.ADMIN_PASSCODE || 'prajval_secret_2026';

  if (!passcode || passcode !== expectedPasscode) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { error } = await supabaseAdmin
    .from('messages')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
