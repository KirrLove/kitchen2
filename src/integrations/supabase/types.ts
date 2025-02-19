export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contact_requests: {
        Row: {
          city: string | null
          comment: string | null
          created_at: string | null
          id: string
          name: string
          phone: string
          status: string | null
          time: string | null
          type: string
        }
        Insert: {
          city?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          name: string
          phone: string
          status?: string | null
          time?: string | null
          type: string
        }
        Update: {
          city?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          name?: string
          phone?: string
          status?: string | null
          time?: string | null
          type?: string
        }
        Relationships: []
      }
      material_colors: {
        Row: {
          color_value: string
          created_at: string | null
          id: number
          name: string
          preview_image_url: string | null
          type: string
        }
        Insert: {
          color_value: string
          created_at?: string | null
          id?: number
          name: string
          preview_image_url?: string | null
          type: string
        }
        Update: {
          color_value?: string
          created_at?: string | null
          id?: number
          name?: string
          preview_image_url?: string | null
          type?: string
        }
        Relationships: []
      }
      material_images: {
        Row: {
          created_at: string | null
          id: number
          image_url: string
          is_primary: boolean | null
          material_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          image_url: string
          is_primary?: boolean | null
          material_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          image_url?: string
          is_primary?: boolean | null
          material_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "material_images_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "material_options"
            referencedColumns: ["id"]
          },
        ]
      }
      material_options: {
        Row: {
          created_at: string | null
          description: string | null
          features: string[] | null
          id: number
          name: string
          price: number
          specifications: Json | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          id?: number
          name: string
          price?: number
          specifications?: Json | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          id?: number
          name?: string
          price?: number
          specifications?: Json | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          address: string
          comment: string | null
          created_at: string | null
          customer_name: string
          id: string
          material: string | null
          phone: string
          product_id: number | null
          product_name: string
          quantity: number
          status: string | null
          style: string | null
          total_amount: number
        }
        Insert: {
          address: string
          comment?: string | null
          created_at?: string | null
          customer_name: string
          id?: string
          material?: string | null
          phone: string
          product_id?: number | null
          product_name: string
          quantity: number
          status?: string | null
          style?: string | null
          total_amount: number
        }
        Update: {
          address?: string
          comment?: string | null
          created_at?: string | null
          customer_name?: string
          id?: string
          material?: string | null
          phone?: string
          product_id?: number | null
          product_name?: string
          quantity?: number
          status?: string | null
          style?: string | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          created_at: string | null
          id: number
          image_url: string
          product_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          image_url: string
          product_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          image_url?: string
          product_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string | null
          description: string | null
          features: string[] | null
          hardware_options: Json | null
          id: number
          material: string | null
          name: string
          price: number
          sink_options: Json | null
          specifications: Json | null
          style: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          hardware_options?: Json | null
          id?: number
          material?: string | null
          name: string
          price: number
          sink_options?: Json | null
          specifications?: Json | null
          style?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          hardware_options?: Json | null
          id?: number
          material?: string | null
          name?: string
          price?: number
          sink_options?: Json | null
          specifications?: Json | null
          style?: string | null
          updated_at?: string | null
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
