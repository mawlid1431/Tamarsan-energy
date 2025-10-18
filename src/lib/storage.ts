import { supabase } from './supabase'

/**
 * Upload an image to Supabase Storage
 * @param file - The image file to upload
 * @param bucket - The storage bucket name (default: 'project-images')
 * @returns The public URL of the uploaded image or null if failed
 */
export async function uploadImage(file: File, bucket: string = 'project-images'): Promise<{ url: string | null; error: string | null }> {
    try {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            return { url: null, error: 'Please select an image file' }
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024 // 5MB
        if (file.size > maxSize) {
            return { url: null, error: 'Image size must be less than 5MB' }
        }

        // Generate unique filename
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
        const filePath = `${fileName}`

        // Upload file to Supabase Storage
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            })

        if (error) {
            console.error('Upload error:', error)
            return { url: null, error: error.message }
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(data.path)

        return { url: publicUrl, error: null }
    } catch (err) {
        console.error('Upload error:', err)
        return { url: null, error: err instanceof Error ? err.message : 'Failed to upload image' }
    }
}

/**
 * Delete an image from Supabase Storage
 * @param url - The public URL of the image to delete
 * @param bucket - The storage bucket name (default: 'project-images')
 */
export async function deleteImage(url: string, bucket: string = 'project-images'): Promise<{ error: string | null }> {
    try {
        // Extract file path from URL
        const urlParts = url.split(`/${bucket}/`)
        if (urlParts.length < 2) {
            return { error: 'Invalid image URL' }
        }

        const filePath = urlParts[1]

        // Delete file from Supabase Storage
        const { error } = await supabase.storage
            .from(bucket)
            .remove([filePath])

        if (error) {
            console.error('Delete error:', error)
            return { error: error.message }
        }

        return { error: null }
    } catch (err) {
        console.error('Delete error:', err)
        return { error: err instanceof Error ? err.message : 'Failed to delete image' }
    }
}
