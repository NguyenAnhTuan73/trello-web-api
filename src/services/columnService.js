/* eslint-disable no-console */
import { boardModel } from "~/models/boardModel"
import { cardModel } from "~/models/cardModel"
import { columnModel } from "~/models/columnModel"

const createNew = async (reqBody) => {
  try {
    const newColumn = { ...reqBody }

    const createdColumn = await columnModel.createNew(newColumn)

    const getnewColumn = await columnModel.findOneById(createdColumn.insertedId)

    if (getnewColumn) {
      getnewColumn.cards = []
      await boardModel.pushColumnOrderIds(getnewColumn)
    }

    return getnewColumn
    // throw new ApiError(StatusCodes.FORBIDDEN, "something wrong");
  } catch (error) {
    console.log(error)
    throw error
  }
}
const listColumns = async () => {
  try {
    return await columnModel.listColumns()
  } catch (error) {
    console.log(error)
    throw error
  }
}
const updateColumn = async (id, updateData) => {
  try {
    const updatedData = { ...updateData, updatedAt: Date.now() }

    const updatedColumn = await columnModel.update(id, updatedData)
    return updatedColumn
  } catch (error) {
    console.log(error)
    throw error
  }
}

const deleteColumn = async (id) => {
  try {
    await columnModel.deleteByOneId(id)

    await cardModel.deleteCardsByColumnId(id)

    return { deleteResult: "Delete column and cards successfully" }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const columnService = { createNew, listColumns, updateColumn, deleteColumn }
