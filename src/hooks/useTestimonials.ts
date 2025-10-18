import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/database.types'

type Testimonial = Database['public']['Tables']['testimonials']['Row']
type TestimonialInsert = Database['public']['Tables']['testimonials']['Insert']
type TestimonialUpdate = Database['public']['Tables']['testimonials']['Update']

export function useTestimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchTestimonials = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setTestimonials(data || [])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch testimonials')
        } finally {
            setLoading(false)
        }
    }

    const addTestimonial = async (testimonial: TestimonialInsert) => {
        try {
            const { data, error } = await supabase
                .from('testimonials')
                .insert(testimonial)
                .select()
                .single()

            if (error) throw error
            setTestimonials(prev => [data, ...prev])
            return { data, error: null }
        } catch (err) {
            return { data: null, error: err instanceof Error ? err.message : 'Failed to add testimonial' }
        }
    }

    const updateTestimonial = async (id: string, updates: TestimonialUpdate) => {
        try {
            const { data, error } = await supabase
                .from('testimonials')
                .update(updates)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            setTestimonials(prev => prev.map(t => t.id === id ? data : t))
            return { data, error: null }
        } catch (err) {
            return { data: null, error: err instanceof Error ? err.message : 'Failed to update testimonial' }
        }
    }

    const deleteTestimonial = async (id: string) => {
        try {
            const { error } = await supabase
                .from('testimonials')
                .delete()
                .eq('id', id)

            if (error) throw error
            setTestimonials(prev => prev.filter(t => t.id !== id))
            return { error: null }
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to delete testimonial' }
        }
    }

    useEffect(() => {
        fetchTestimonials()
    }, [])

    return { testimonials, loading, error, addTestimonial, updateTestimonial, deleteTestimonial, refetch: fetchTestimonials }
}
