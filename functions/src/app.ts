import express, { json, urlencoded } from "express";
import routes from "./routes";

export const app = express();

app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

app.use("/", routes);
