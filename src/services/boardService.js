/* eslint-disable no-console */
import { StatusCodes } from "http-status-codes"
import { boardModel } from "~/models/boardModel"
import ApiError from "~/utils/ApiError"
import { slugify } from "~/utils/formatter"
import { cloneDeep } from "lodash"

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
      column.cards = resBoard.cards.filter(
        (card) => card.columnId.toString() === column._id.toString(),
      )
    })
    delete resBoard.cards
    return resBoard
  } catch (error) {
    console.log(error)
  }
}
export const boardService = { createNew, getDetails }
