import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const EMAIL_TO = process.env.TIME_CAPSULE_EMAIL_TO || 'contehfavour51@gmail.com'
const EMAIL_FROM = process.env.EMAIL_FROM || 'no-reply@ella20-love.com'

export async function POST(request: Request) {
  const body = await request.json()
  const message = body?.message

  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'Missing time capsule message.' }, { status: 400 })
  }

  if (!process.env.EMAIL_SMTP_HOST || !process.env.EMAIL_SMTP_USER || !process.env.EMAIL_SMTP_PASS) {
    return NextResponse.json(
      { error: 'Email configuration is missing. Set EMAIL_SMTP_HOST, EMAIL_SMTP_PORT, EMAIL_SMTP_USER, and EMAIL_SMTP_PASS.' },
      { status: 500 }
    )
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST,
    port: Number(process.env.EMAIL_SMTP_PORT || 587),
    secure: process.env.EMAIL_SMTP_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_SMTP_USER,
      pass: process.env.EMAIL_SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: 'Ella time capsule sealed',
      text: `Your time capsule message for Ella has been sealed:\n\n${message}`,
      html: `<div style="font-family:system-ui, sans-serif; line-height:1.6; color:#2C1A1A;"><h2>Ella time capsule sealed</h2><pre style="white-space:pre-wrap; word-break:break-word;">${escapeHtml(message)}</pre></div>`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email send failed:', error)
    return NextResponse.json({ error: 'Failed to send email. Check server logs.' }, { status: 500 })
  }
}
