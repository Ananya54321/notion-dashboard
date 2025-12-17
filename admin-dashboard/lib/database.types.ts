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
      events: {
        Row: {
          id: number
          created_at: string | null
          updated_at: string | null
          farcaster: string | null
          twitter: string | null
          start_value: string | null
          theme_optional: string | null
          link: string | null
          telegram: string | null
          created_time: string | null
          approved: boolean | null
          location_optional: string | null
          end_value: string | null
          last_edited_time: string | null
          highlighted: boolean | null
          logo: string | null
          banner_image: string | null
          venue_type: string | null
          season: string | null
          category_optional: string | null
          discord: string | null
          ecosystem_focus: string | null
          event: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          updated_at?: string | null
          farcaster?: string | null
          twitter?: string | null
          start_value?: string | null
          theme_optional?: string | null
          link?: string | null
          telegram?: string | null
          created_time?: string | null
          approved?: boolean | null
          location_optional?: string | null
          end_value?: string | null
          last_edited_time?: string | null
          highlighted?: boolean | null
          logo?: string | null
          banner_image?: string | null
          venue_type?: string | null
          season?: string | null
          category_optional?: string | null
          discord?: string | null
          ecosystem_focus?: string | null
          event?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          updated_at?: string | null
          farcaster?: string | null
          twitter?: string | null
          start_value?: string | null
          theme_optional?: string | null
          link?: string | null
          telegram?: string | null
          created_time?: string | null
          approved?: boolean | null
          location_optional?: string | null
          end_value?: string | null
          last_edited_time?: string | null
          highlighted?: boolean | null
          logo?: string | null
          banner_image?: string | null
          venue_type?: string | null
          season?: string | null
          category_optional?: string | null
          discord?: string | null
          ecosystem_focus?: string | null
          event?: string | null
        }
      }
    }
  }
}

export type Event = Database['public']['Tables']['events']['Row'];

