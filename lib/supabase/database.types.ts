export type TargetExam = "JEE" | "NEET" | "UPSC" | "SAT";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          target_exam: TargetExam | null;
          target_year: number | null;
          city: string | null;
          state: string | null;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          target_exam?: TargetExam | null;
          target_year?: number | null;
          city?: string | null;
          state?: string | null;
        };
        Update: {
          full_name?: string | null;
          target_exam?: TargetExam | null;
          target_year?: number | null;
          city?: string | null;
          state?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];