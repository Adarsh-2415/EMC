/**
 * Sends a non-blocking asynchronous email notification request to the serverless API.
 * Returns true if sent successfully, false otherwise.
 */
export async function sendEmailNotification(
  type: 'application' | 'support',
  data: Record<string, unknown>
): Promise<boolean> {
  try {
    const response = await fetch('/api/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, data }),
    })
    return response.ok
  } catch {
    // Non-blocking catch: ensures user form submission data is never lost if SMTP fails
    return false
  }
}
