import { nextCsrf } from "next-csrf";

const { csrf, setup } = nextCsrf({
  secret: process.env.CSRF_SECRET,
});

export { csrf, setup };
