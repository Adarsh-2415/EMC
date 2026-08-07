/* eslint-disable no-undef */
import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'
import {
  generateOnlineApplicationEmailHtml,
  generateSupportInquiryEmailHtml,
  type OnlineApplicationEmailData,
  type SupportInquiryEmailData,
} from '../src/templates/emailTemplates.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { type, data } = req.body || {}

    if (!type || !data) {
      return res.status(400).json({ error: 'Bad Request: Missing type or data in payload' })
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10)
    const smtpUser = process.env.SMTP_USER || 'forms.futuresoft@gmail.com'
    const smtpPass = process.env.SMTP_PASSWORD
    const smtpSecure = process.env.SMTP_SECURE !== 'false'

    const fromEmail = process.env.SMTP_FROM_EMAIL || 'forms.futuresoft@gmail.com'
    const fromName = process.env.SMTP_FROM_NAME || 'EXCEL MANAGEMENT CERTIFICATION'
    const adminRecipient = process.env.ADMIN_NOTIFICATION_EMAIL || 'forms.futuresoft@gmail.com'

    console.log('[SMTP Config Attempt]:', {
      host: smtpHost,
      port: smtpPort,
      user: smtpUser,
      passConfigured: Boolean(smtpPass),
      secure: smtpSecure,
    })

    if (!smtpPass) {
      console.warn('[SMTP Warning] SMTP_PASSWORD environment variable is not configured. Email notification skipped.')
      return res.status(200).json({
        success: false,
        message: 'SMTP_PASSWORD is not configured in server environment',
      })
    }

    // Create Nodemailer Transporter for Gmail / Custom SMTP
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 15000,
    })

    let subject = ''
    let htmlContent = ''

    if (type === 'application') {
      const appData = data as OnlineApplicationEmailData
      subject = `[EMC Application] New Certification Lead - ${appData.companyName || 'Company'}`
      htmlContent = generateOnlineApplicationEmailHtml(appData)
    } else if (type === 'support') {
      const suppData = data as SupportInquiryEmailData
      const fullName = `${suppData.firstName} ${suppData.lastName}`.trim()
      subject = `[EMC Support] New Inquiry (${suppData.department}) - ${fullName}`
      htmlContent = generateSupportInquiryEmailHtml(suppData)
    } else {
      return res.status(400).json({ error: 'Invalid notification type' })
    }

    // Send email via SMTP
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: adminRecipient,
      subject,
      html: htmlContent,
      replyTo: data.email || fromEmail,
    })

    console.log('[SMTP Success]: Email delivered, messageId:', info.messageId)

    return res.status(200).json({
      success: true,
      messageId: info.messageId,
      message: 'Notification email sent successfully',
    })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Unknown SMTP Error'
    console.error('[SMTP Notification Failure Details]:', error)
    return res.status(500).json({
      error: 'Failed to send SMTP email notification',
      details: errMsg,
    })
  }
}
