import express, { Request, Response } from "express";
import { Gentleman } from "./gentleman";

const PORT = +(process.env.PORT ?? 3000);
const HOST = process.env.HOST ?? "0.0.0.0";

const app = express();

const gentleman = new Gentleman();

app.get("/greet", (req: Request, res: Response) => {
  const greeting = gentleman.greet(req.query.name as string);
  return res.json({ greeting });
});

app.on("error", (err) => {
  console.error(err);
  process.exit(1);
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

process.on("uncaughtException", async (err: Error) => {
  console.error(err);

  server.close(() => {
    console.log("HTTP server closed");
  });
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing HTTP server");

  server.close(() => {
    console.log("HTTP server closed");
  });
});
