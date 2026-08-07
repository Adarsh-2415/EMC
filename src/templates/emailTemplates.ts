export interface OnlineApplicationEmailData {
  companyName: string
  address: string
  mobileNumber: string
  email: string
  certificationRequired: string
  message: string
  submittedAt: string
}

export interface SupportInquiryEmailData {
  firstName: string
  lastName: string
  email: string
  department: string
  subject: string
  message: string
  submittedAt: string
}

/**
 * Generates corporate HTML email template for Online Application Submissions
 */
export function generateOnlineApplicationEmailHtml(data: OnlineApplicationEmailData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Online Application Submission</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    .header { background-color: #0f172a; padding: 24px 32px; text-align: center; border-bottom: 4px solid #059669; }
    .header h1 { color: #ffffff; margin: 0; font-size: 18px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; }
    .badge { display: inline-block; background-color: rgba(5, 150, 105, 0.15); color: #059669; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 12px; border-radius: 9999px; margin-top: 8px; border: 1px solid rgba(5, 150, 105, 0.3); }
    .content { padding: 32px; }
    .intro { font-size: 14px; color: #475569; margin-bottom: 24px; line-height: 1.5; font-weight: 500; }
    .data-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .data-table th, .data-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
    .data-table th { width: 35%; color: #64748b; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; background-color: #f8fafc; }
    .data-table td { color: #0f172a; font-weight: 600; }
    .highlight-cell { color: #059669 !important; font-weight: 800 !important; }
    .message-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-top: 8px; font-size: 13px; color: #334155; line-height: 1.6; white-space: pre-line; }
    .footer { background-color: #f8fafc; padding: 20px 32px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; }
    .footer p { margin: 4px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>EXCEL MANAGEMENT CERTIFICATION</h1>
      <span class="badge">Online Application Lead</span>
    </div>
    <div class="content">
      <p class="intro">A new certification application lead has been submitted through the EMC website. Details are recorded below:</p>
      
      <table class="data-table">
        <tr>
          <th>Company Name</th>
          <td>${escapeHtml(data.companyName)}</td>
        </tr>
        <tr>
          <th>Email Address</th>
          <td><a href="mailto:${escapeHtml(data.email)}" style="color: #059669; text-decoration: none;">${escapeHtml(data.email)}</a></td>
        </tr>
        <tr>
          <th>Mobile Number</th>
          <td>${escapeHtml(data.mobileNumber)}</td>
        </tr>
        <tr>
          <th>Standard Required</th>
          <td class="highlight-cell">${escapeHtml(data.certificationRequired)}</td>
        </tr>
        <tr>
          <th>Postal Address</th>
          <td>${escapeHtml(data.address)}</td>
        </tr>
        <tr>
          <th>Submitted Date</th>
          <td>${escapeHtml(data.submittedAt)}</td>
        </tr>
      </table>

      <div style="margin-top: 16px;">
        <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Message / Scope Description:</span>
        <div class="message-box">${escapeHtml(data.message)}</div>
      </div>
    </div>
    <div class="footer">
      <p>This is an automated notification from the <strong>EXCEL MANAGEMENT CERTIFICATION</strong></p>
      <p>&copy; ${new Date().getFullYear()} Excel Management Certifications. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `
}

/**
 * Generates corporate HTML email template for Support Inquiries
 */
export function generateSupportInquiryEmailHtml(data: SupportInquiryEmailData): string {
  const fullName = `${data.firstName} ${data.lastName}`.trim()

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Support Inquiry Submitted</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    .header { background-color: #0f172a; padding: 24px 32px; text-align: center; border-bottom: 4px solid #4f46e5; }
    .header h1 { color: #ffffff; margin: 0; font-size: 18px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; }
    .badge { display: inline-block; background-color: rgba(79, 70, 229, 0.15); color: #4f46e5; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 12px; border-radius: 9999px; margin-top: 8px; border: 1px solid rgba(79, 70, 229, 0.3); }
    .content { padding: 32px; }
    .intro { font-size: 14px; color: #475569; margin-bottom: 24px; line-height: 1.5; font-weight: 500; }
    .data-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .data-table th, .data-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
    .data-table th { width: 35%; color: #64748b; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; background-color: #f8fafc; }
    .data-table td { color: #0f172a; font-weight: 600; }
    .highlight-cell { color: #4f46e5 !important; font-weight: 800 !important; }
    .message-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-top: 8px; font-size: 13px; color: #334155; line-height: 1.6; white-space: pre-line; }
    .footer { background-color: #f8fafc; padding: 20px 32px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; }
    .footer p { margin: 4px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>EXCEL MANAGEMENT CERTIFICATION</h1>
      <span class="badge">Support Inquiry Ticket</span>
    </div>
    <div class="content">
      <p class="intro">A new support message has been submitted through the EMC website. Details are recorded below:</p>
      
      <table class="data-table">
        <tr>
          <th>Full Name</th>
          <td>${escapeHtml(fullName)}</td>
        </tr>
        <tr>
          <th>Email Address</th>
          <td><a href="mailto:${escapeHtml(data.email)}" style="color: #4f46e5; text-decoration: none;">${escapeHtml(data.email)}</a></td>
        </tr>
        <tr>
          <th>Department</th>
          <td class="highlight-cell">${escapeHtml(data.department)}</td>
        </tr>
        <tr>
          <th>Subject</th>
          <td>${escapeHtml(data.subject)}</td>
        </tr>
        <tr>
          <th>Submitted Date</th>
          <td>${escapeHtml(data.submittedAt)}</td>
        </tr>
      </table>

      <div style="margin-top: 16px;">
        <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Message Details:</span>
        <div class="message-box">${escapeHtml(data.message)}</div>
      </div>
    </div>
    <div class="footer">
      <p>This is an automated notification from the <strong>EXCEL MANAGEMENT CERTIFICATION</strong></p>
      <p>&copy; ${new Date().getFullYear()} Excel Management Certifications. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `
}

function escapeHtml(str: string): string {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
