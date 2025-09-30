export async function createTransport() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error("SMTP not configured")
  }

  const nodemailer = await import("nodemailer")
  return nodemailer.default.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

export async function sendMail(options: {
  to: string | string[]
  subject: string
  html: string
  from?: string
}) {
  const transporter = await createTransport()
  const from = options.from || process.env.SMTP_FROM || options.to.toString()
  await transporter.sendMail({
    from,
    to: Array.isArray(options.to) ? options.to.join(",") : options.to,
    subject: options.subject,
    html: options.html,
  })
}


