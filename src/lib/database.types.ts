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
      todos: {
        Row: {
          id: string
          text: string
          completed: boolean
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          text: string
          completed?: boolean
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          text?: string
          completed?: boolean
          user_id?: string
          created_at?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}