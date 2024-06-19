import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://tymxgddvlgeotlhzismd.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5bXhnZGR2bGdlb3RsaHppc21kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2MzU1NzksImV4cCI6MjAzNDIxMTU3OX0.tH8IR7B98OD2WnG3zAIm0QP7OwIioevEe_ZbQ5qhAME";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
