import "express-async-errors";

import express, { NextFunction, json, Request, Response } from "express";

import { clientRoutes } from "./routes";

const app = express();

app.use(express.json());

app.use(clientRoutes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

app.listen("3000", () => {
  console.log("Server is running!");
});
