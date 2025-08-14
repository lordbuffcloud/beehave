// Supabase database types for Beehave
// Generated types for type-safe database operations

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
      users: {
        Row: {
          id: string
          name: string
          role: 'manager' | 'child'
          ui_mode: 'adult' | 'kid'
          honey_balance: number
          avatar_url: string | null
          family_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: 'manager' | 'child'
          ui_mode?: 'adult' | 'kid'
          honey_balance?: number
          avatar_url?: string | null
          family_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: 'manager' | 'child'
          ui_mode?: 'adult' | 'kid'
          honey_balance?: number
          avatar_url?: string | null
          family_id?: string | null
          updated_at?: string
        }
      }
      chores: {
        Row: {
          id: string
          title: string
          description: string
          frequency: 'daily' | 'weekly' | 'once'
          honey_value: number
          assignee_id: string
          proof_photo_url: string | null
          status: 'open' | 'done'
          family_id: string
          created_at: string
          completed_at: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          frequency: 'daily' | 'weekly' | 'once'
          honey_value: number
          assignee_id: string
          proof_photo_url?: string | null
          status?: 'open' | 'done'
          family_id: string
          created_at?: string
          completed_at?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          frequency?: 'daily' | 'weekly' | 'once'
          honey_value?: number
          assignee_id?: string
          proof_photo_url?: string | null
          status?: 'open' | 'done'
          family_id?: string
          completed_at?: string | null
          updated_at?: string
        }
      }
      spend_requests: {
        Row: {
          id: string
          kid_id: string
          description: string
          cost_honey: number
          status: 'pending' | 'approved' | 'denied'
          created_at: string
          reviewed_at: string | null
          reviewed_by: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          kid_id: string
          description: string
          cost_honey: number
          status?: 'pending' | 'approved' | 'denied'
          created_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          kid_id?: string
          description?: string
          cost_honey?: number
          status?: 'pending' | 'approved' | 'denied'
          reviewed_at?: string | null
          reviewed_by?: string | null
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          type: 'deposit' | 'deduct' | 'spend'
          amount: number
          reason: string
          chore_id: string | null
          spend_request_id: string | null
          family_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'deposit' | 'deduct' | 'spend'
          amount: number
          reason: string
          chore_id?: string | null
          spend_request_id?: string | null
          family_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'deposit' | 'deduct' | 'spend'
          amount?: number
          reason?: string
          chore_id?: string | null
          spend_request_id?: string | null
          family_id?: string
        }
      }
      ,
      family_members: {
        Row: {
          id: string
          family_id: string
          name: string
          pin_hash: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          family_id: string
          name: string
          pin_hash: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          family_id?: string
          name?: string
          pin_hash?: string
          updated_at?: string
        }
      }
      families: {
        Row: {
          id: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'manager' | 'child'
      ui_mode: 'adult' | 'kid'
      chore_frequency: 'daily' | 'weekly' | 'once'
      chore_status: 'open' | 'done'
      spend_request_status: 'pending' | 'approved' | 'denied'
      transaction_type: 'deposit' | 'deduct' | 'spend'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 