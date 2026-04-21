import express from "express"
import { StatusCodes } from "http-status-codes"
import { cardRoute } from "~/routes/v1/cardRoute"
import { columnRoute } from "~/routes/v1/columnRoute"
import { boardRoute } from "~/routes/v1/boardRoute"

const Router = express.Router()

Router.get("/status", (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ message: "Apis v1 are ready", status: StatusCodes.OK })
})
Router.use("/boards", boardRoute)
Router.use("/columns", columnRoute)
Router.use("/cards", cardRoute)
export const APIs_V1 = Router
