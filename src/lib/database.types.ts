export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            projects: {
                Row: {
                    id: string
                    name: string
                    date: string
                    location: string
                    description: string
                    image_url: string | null
                    rate: number | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    date: string
                    location: string
                    description: string
                    image_url?: string | null
                    rate?: number | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    date?: string
                    location?: string
                    description?: string
                    image_url?: string | null
                    rate?: number | null
                    created_at?: string
                    updated_at?: string
                }
                Relationships: []
            }
            services: {
                Row: {
                    id: string
                    title: string
                    description: string
                    icon: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    description: string
                    icon?: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    description?: string
                    icon?: string
                    created_at?: string
                    updated_at?: string
                }
                Relationships: []
            }
            testimonials: {
                Row: {
                    id: string
                    rate: number | null
                    description: string
                    role: string
                    location: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    rate?: number | null
                    description: string
                    role: string
                    location: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    rate?: number | null
                    description?: string
                    role?: string
                    location?: string
                    created_at?: string
                    updated_at?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
