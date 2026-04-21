import { StatusCodes } from "http-status-codes"
import { columnService } from "~/services/columnService"
const createNew = async (req, res, next) => {
  try {
    const createColumn = await columnService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createColumn)
    // throw new Error("Test error");
  } catch (error) {
    next(error)
  }
}

export const columnController = { createNew }
