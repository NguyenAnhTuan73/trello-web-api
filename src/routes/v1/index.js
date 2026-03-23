import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardRoute } from "~/routes/v1/boardRoute";
const Router = express.Router();

Router.get("/status", (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ message: "Apis v1 are ready", status: StatusCodes.OK });
});
Router.use("/boards", boardRoute);
export const APIs_V1 = Router;
