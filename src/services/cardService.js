/* eslint-disable no-console */
import { cardModel } from "~/models/cardModel"
import { slugify } from "~/utils/formatter"

const createNew = async (reqBody) => {
  try {
    const newCard = { ...reqBody, slug: slugify(reqBody.title) }

    const createdCard = await cardModel.createNew(newCard)

    const getnewCard = await cardModel.findOneById(createdCard.insertedId)

    return getnewCard
    // throw new ApiError(StatusCodes.FORBIDDEN, "something wrong");
  } catch (error) {
    console.log(error)
  }
}

export const cardService = { createNew }
