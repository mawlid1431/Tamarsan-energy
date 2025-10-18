import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/database.types'

type Project = Database['public']['Tables']['projects']['Row']
type ProjectInsert = Database['public']['Tables']['projects']['Insert']
type ProjectUpdate = Database['public']['Tables']['projects']['Update']

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchProjects = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('date', { ascending: false })

            if (error) throw error
            setProjects(data || [])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch projects')
        } finally {
            setLoading(false)
        }
    }

    const addProject = async (project: ProjectInsert) => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .insert(project)
                .select()
                .single()

            if (error) throw error
            setProjects(prev => [data, ...prev])
            return { data, error: null }
        } catch (err) {
            return { data: null, error: err instanceof Error ? err.message : 'Failed to add project' }
        }
    }

    const updateProject = async (id: string, updates: ProjectUpdate) => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .update(updates)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            setProjects(prev => prev.map(p => p.id === id ? data : p))
            return { data, error: null }
        } catch (err) {
            return { data: null, error: err instanceof Error ? err.message : 'Failed to update project' }
        }
    }

    const deleteProject = async (id: string) => {
        try {
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', id)

            if (error) throw error
            setProjects(prev => prev.filter(p => p.id !== id))
            return { error: null }
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to delete project' }
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return { projects, loading, error, addProject, updateProject, deleteProject, refetch: fetchProjects }
}
