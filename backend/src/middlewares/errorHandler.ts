import { ErrorHandler } from "hono";


export const errorHandler: ErrorHandler = (err, c) =>  {
  console.error(err.stack);
  return c.json({ error: err.message }, 500);
}