import express from "express"
import { StatusCodes } from "http-status-codes"
import { boardController } from "~/controllers/boardController"
import { boardValidation } from "~/validations/boardValidation"
const Router = express.Router()
Router.route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "Note: API get list board" })
  })
  .post(boardValidation.creatNew, boardController.createNew)

Router.route("/:id")
  .get(boardController.getDetails)
  .put(boardValidation.update, boardController.update)
export const boardRoute = Router
Router.route("/supports/moving_card").put(
  boardValidation.moveCardToDifferentColumn,
  boardController.moveCardToDifferentColumn,
)
