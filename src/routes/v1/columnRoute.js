import express from "express"
import { columnController } from "~/controllers/columnController"
import { columnValidation } from "~/validations/columnValidation"
const Router = express.Router()
Router.route("/")

  .post(columnValidation.creatNew, columnController.createNew)

export const columnRoute = Router
