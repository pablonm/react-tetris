import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { csrf } from "@/lib/csrf";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { data } = await supabase
      .from("scores")
      .select("*")
      .order("score", { ascending: false })
      .order("created_at", { ascending: true })
      .limit(100);

    res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { data } = await supabase
      .from("scores")
      .insert([
        {
          name: req.body.name,
          score: req.body.score,
        },
      ])
      .select("id");
    res.status(200).json(data);
  }

  res.status(404);
};

export default csrf(handler);
