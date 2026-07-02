"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

type UpdateProfileState = {
  error?: string;
  success?: boolean;
};

export async function updateProfile(
  profileId: string,
  _previousState: UpdateProfileState | undefined,
  formData: FormData,
): Promise<UpdateProfileState> {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const targetExam = String(formData.get("target_exam") ?? "").trim();
  const targetYearValue = String(formData.get("target_year") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const state = String(formData.get("state") ?? "").trim();

  if (!fullName || !targetExam || !targetYearValue || !city || !state) {
    return {
      error: "Complete every field before continuing.",
    };
  }

  const targetYear = Number(targetYearValue);

  if (!Number.isInteger(targetYear) || targetYear < 1900) {
    return {
      error: "Enter a valid target year.",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.id !== profileId) {
    redirect("/login");
  }

  const { error } = await supabase.from("profiles").upsert(
    {
      id: profileId,
      full_name: fullName,
      target_exam: targetExam as "JEE" | "NEET" | "UPSC" | "SAT",
      target_year: targetYear,
      city,
      state,
    },
    {
      onConflict: "id",
    },
  );

  if (error) {
    return {
      error: error.message,
    };
  }

  return {
    success: true,
  };
}