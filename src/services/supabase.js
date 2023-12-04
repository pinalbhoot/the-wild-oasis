import { createClient } from "@supabase/supabase-js";

export const supabaseurl = "https://hcbliigpmzslkzowfbhn.supabase.co"
const supabasekey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjYmxpaWdwbXpzbGt6b3dmYmhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgyMTc2OTAsImV4cCI6MjAxMzc5MzY5MH0.rVv0S1ZwhSm5iLN2ps9sKC0uCoDn3D_LrG5ces4tztQ";
const supabase = createClient(supabaseurl,supabasekey);

export default supabase;