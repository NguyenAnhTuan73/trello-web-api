/* eslint-disable no-console */
import { columnModel } from "~/models/columnModel"

const createNew = async (reqBody) => {
  try {
    const newColumn = { ...reqBody }

    const createdColumn = await columnModel.createNew(newColumn)

    const getnewColumn = await columnModel.findOneById(createdColumn.insertedId)

    return getnewColumn
    // throw new ApiError(StatusCodes.FORBIDDEN, "something wrong");
  } catch (error) {
    console.log(error)
  }
}

export const columnService = { createNew }
