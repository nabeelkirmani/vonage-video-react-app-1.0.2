import express, { Express, Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { Server } from "http";
import router from "./routes/index";

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const port = process.env.VCR_PORT ?? 3345;

const app: Express = express();
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());
app.set("trust proxy", true);

app.use((req, res, next) => {
  // This is needed to remove the deployed application from being indexed by Search engines
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  next();
});

app.use(router);

app.use(express.static(path.join(dirName, "./dist")));

app.get("/*", (_req: Request, res: Response) => {
  res.sendFile(path.join(dirName, "dist", "index.html"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(
  (err: Error, _req: Request, res: Response, _next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  },
);

const startServer: () => Promise<Server> = () => {
  return new Promise((res) => {
    const server: Server = app.listen(port, () => {
      console.log("Server listening on port", port);
      res(server);
    });
  });
};

export default startServer;
