import express from "express"
import { columnController } from "~/controllers/columnController"
import { columnValidation } from "~/validations/columnValidation"
const Router = express.Router()
Router.route("/").get(columnController.listColumns)
Router.route("/").post(columnValidation.creatNew, columnController.createNew)
Router.route("/:id").put(columnValidation.updateColumn, columnController.updateColumn)
Router.route("/:id").delete(columnValidation.deleteColumn, columnController.deleteColumn)

export const columnRoute = Router
