import { supabase } from '@/lib/supabase'

const BUCKET_NAME = 'certificate-pdfs'

/**
 * Sanitizes certificate number to be safe for filenames
 */
export function formatPdfFilename(certNo: string): string {
  const safeName = certNo.trim().replace(/[/\\?%*:|"<>]/g, '_')
  return `${safeName}.pdf`
}

/**
 * Uploads PDF file into certificate-pdfs storage bucket
 */
export async function uploadCertificatePdf(
  file: File,
  certNo: string
): Promise<{ path: string | null; error: Error | null }> {
  try {
    const filename = formatPdfFilename(certNo)

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: true,
      })

    if (error) {
      return { path: null, error: new Error(error.message) }
    }

    return { path: data.path, error: null }
  } catch (err) {
    return { path: null, error: err instanceof Error ? err : new Error('Upload failed') }
  }
}

/**
 * Renames an existing PDF in certificate-pdfs bucket ONLY IF Certificate Number changes AND old PDF exists
 */
export async function renameCertificatePdf(
  oldCertNo: string,
  newCertNo: string
): Promise<{ newPath: string | null; error: Error | null }> {
  try {
    if (oldCertNo.trim() === newCertNo.trim()) {
      return { newPath: `${formatPdfFilename(oldCertNo)}`, error: null }
    }

    const oldPath = formatPdfFilename(oldCertNo)
    const newPath = formatPdfFilename(newCertNo)

    // Move file in Supabase storage bucket
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .move(oldPath, newPath)

    if (error) {
      return { newPath: null, error: new Error(error.message) }
    }

    return { newPath, error: null }
  } catch (err) {
    return { newPath: null, error: err instanceof Error ? err : new Error('Rename failed') }
  }
}

/**
 * Deletes PDF file from certificate-pdfs storage bucket
 */
export async function deleteCertificatePdf(certNo: string): Promise<boolean> {
  try {
    const filename = formatPdfFilename(certNo)
    const { error } = await supabase.storage.from(BUCKET_NAME).remove([filename])
    return !error
  } catch {
    return false
  }
}
