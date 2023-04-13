import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function GET(request: Request) {
  const { data } = await supabase
    .from("scores")
    .select("*")
    .order("score", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(100);
  return new Response(JSON.stringify(data));
}

export async function POST(request: Request) {
  const req = await request.json();
  const { data } = await supabase
    .from("scores")
    .insert([
      {
        name: req.name,
        score: req.score,
      },
    ])
    .select("id");
  return new Response(JSON.stringify(data));
}
