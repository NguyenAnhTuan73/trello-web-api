/* eslint-disable no-console */
import { cardModel } from "~/models/cardModel"
import { columnModel } from "~/models/columnModel"

const createNew = async (reqBody) => {
  try {
    const newCard = { ...reqBody }

    const createdCard = await cardModel.createNew(newCard)

    const getnewCard = await cardModel.findOneById(createdCard.insertedId)
    if (getnewCard) {
      // getnewColumn.cards = []
      await columnModel.pushCardOrderIds(getnewCard)
    }

    return getnewCard
    // throw new ApiError(StatusCodes.FORBIDDEN, "something wrong");
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const cardService = { createNew }
