import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

const cors = Cors({
  methods: ["POST", "GET"],
  // origin: "https://react-tetris-alpha.vercel.app/",
  origin: "https://localhost:3000/",
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  const { data } = await supabase
    .from("scores")
    .select("*")
    .order("score", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(100);
  return new Response(JSON.stringify(data));
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  const request = await JSON.parse(req.body);
  const { data } = await supabase
    .from("scores")
    .insert([
      {
        name: request.name,
        score: request.score,
      },
    ])
    .select("id");
  return new Response(JSON.stringify(data));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await runMiddleware(req, res, cors);

    const { data } = await supabase
      .from("scores")
      .select("*")
      .order("score", { ascending: false })
      .order("created_at", { ascending: true })
      .limit(100);
    return new Response(JSON.stringify(data));
  }
}
