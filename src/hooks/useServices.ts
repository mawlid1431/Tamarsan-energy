import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/database.types'

type Service = Database['public']['Tables']['services']['Row']
type ServiceInsert = Database['public']['Tables']['services']['Insert']
type ServiceUpdate = Database['public']['Tables']['services']['Update']

export function useServices() {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchServices = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setServices(data || [])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch services')
        } finally {
            setLoading(false)
        }
    }

    const addService = async (service: ServiceInsert) => {
        try {
            const { data, error } = await supabase
                .from('services')
                .insert(service)
                .select()
                .single()

            if (error) throw error
            setServices(prev => [data, ...prev])
            return { data, error: null }
        } catch (err) {
            return { data: null, error: err instanceof Error ? err.message : 'Failed to add service' }
        }
    }

    const updateService = async (id: string, updates: ServiceUpdate) => {
        try {
            const { data, error } = await supabase
                .from('services')
                .update(updates)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            setServices(prev => prev.map(s => s.id === id ? data : s))
            return { data, error: null }
        } catch (err) {
            return { data: null, error: err instanceof Error ? err.message : 'Failed to update service' }
        }
    }

    const deleteService = async (id: string) => {
        try {
            const { error } = await supabase
                .from('services')
                .delete()
                .eq('id', id)

            if (error) throw error
            setServices(prev => prev.filter(s => s.id !== id))
            return { error: null }
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to delete service' }
        }
    }

    useEffect(() => {
        fetchServices()
    }, [])

    return { services, loading, error, addService, updateService, deleteService, refetch: fetchServices }
}
