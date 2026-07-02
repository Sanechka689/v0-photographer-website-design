import { NextResponse } from 'next/server'

type ContactPayload = {
  name?: string
  phone?: string
  email?: string
  message?: string
}

export async function POST(request: Request) {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL
  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET

  if (!scriptUrl) {
    console.error('GOOGLE_APPS_SCRIPT_URL is not configured')
    return NextResponse.json({ error: 'server_not_configured' }, { status: 500 })
  }

  let payload: ContactPayload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const name = payload.name?.trim()
  const phone = payload.phone?.trim()
  const email = payload.email?.trim()
  const message = payload.message?.trim() ?? ''

  if (!name || !phone || !email) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }

  try {
    const upstream = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, name, phone, email, message }),
      redirect: 'follow',
    })

    const text = await upstream.text()
    let parsed: { status?: string } | null = null
    try {
      parsed = JSON.parse(text)
    } catch {
      parsed = null
    }

    if (!upstream.ok || parsed?.status !== 'ok') {
      console.error('Google Apps Script rejected submission', upstream.status, text)
      return NextResponse.json({ error: 'upstream_error' }, { status: 502 })
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Failed to reach Google Apps Script', error)
    return NextResponse.json({ error: 'upstream_unreachable' }, { status: 502 })
  }
}
