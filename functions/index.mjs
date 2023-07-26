import express from "express";
import serverless from "serverless-http";
import userRouter from './routes/userRouter.mjs';
import noteRouter from './routes/noteRouter.mjs'

const app = express();

app.use(express.json());
app.use('/api/v1/users',userRouter);
app.use('/api/v1/notes',noteRouter);

app.get("/", async (_req, res) => {
  res.send({
    message: "Ok!"
  })
})

app.use((_req, res, _next) => res.status(404).json({
  error: "Not Found",
}));

export const handler = serverless(app);
