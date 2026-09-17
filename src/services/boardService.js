/* eslint-disable no-console */
import { StatusCodes } from "http-status-codes"
import { boardModel } from "~/models/boardModel"
import ApiError from "~/utils/ApiError"
import { slugify } from "~/utils/formatter"
import { cloneDeep } from "lodash"
import { cardModel } from "~/models/cardModel"
import { columnModel } from "~/models/columnModel"

const createNew = async (reqBody) => {
  try {
    const newBoard = { ...reqBody, slug: slugify(reqBody.title) }
    const createdBoard = await boardModel.createNew(newBoard)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    return getNewBoard
    // throw new ApiError(StatusCodes.FORBIDDEN, "something wrong");
  } catch (error) {
    console.log(error)
  }
}
const getDetails = async (id) => {
  try {
    const getDataDetails = await boardModel.getDetails(id)
    if (!getDataDetails) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Board not found!")
    }
    const resBoard = cloneDeep(getDataDetails)
    resBoard.columns.forEach((column) => {
      column.cards = resBoard.cards.filter((card) => card.columnId.toString() === column._id.toString())
    })
    delete resBoard.cards
    return resBoard
  } catch (error) {
    console.log(error)
  }
}
const update = async (id, updateData) => {
  try {
    const updatedData = { ...updateData, updatedAt: Date.now() }

    const updatedBoard = await boardModel.update(id, updatedData)
    return updatedBoard
  } catch (error) {
    console.log(error)
  }
}
const moveCardToDifferentColumn = async (reqBody) => {
  try {
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: Date.now(),
    })
    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now(),
    })
    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId,
    })

    return { updateResult: "Successfully" }
  } catch (error) {
    console.log(error)
  }
}
export const boardService = { createNew, getDetails, update, moveCardToDifferentColumn }
