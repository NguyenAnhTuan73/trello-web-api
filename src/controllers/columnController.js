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

const listColumns = async (req, res, next) => {
  try {
    const columns = await columnService.listColumns()
    res.status(StatusCodes.OK).json(columns)
  } catch (error) {
    next(error)
  }
}

const updateColumn = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedColumn = await columnService.updateColumn(id, req.body)
    res.status(StatusCodes.OK).json(updatedColumn)
  } catch (error) {
    next(error)
  }
}
const deleteColumn = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedColumn = await columnService.deleteColumn(id)
    res.status(StatusCodes.OK).json(deletedColumn)
  } catch (error) {
    next(error)
  }
}

export const columnController = { createNew, listColumns, updateColumn, deleteColumn }
