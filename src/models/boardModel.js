//
import Joi from "joi"
import { ObjectId } from "mongodb"
import { GET_DB } from "~/config/mongodb"
import { cardModel } from "~/models/cardModel"
import { columnModel } from "~/models/columnModel"
import { BOARD_TYPES } from "~/utils/constants"
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators"

const BOARD_COLLECTION_NAME = "boards"
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(100).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),
  columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),

  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
})
const INVALIED_UPDATE_FIELDS = ["_id", "createdAt", "_destroy"]

const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    // eslint-disable-next-line no-console
    return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}
const findOneById = async (id) => {
  try {
    return await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id),
      })
  } catch (error) {
    throw new Error(error)
  }
}
const getDetails = async (id) => {
  try {
    // eslint-disable-next-line no-console

    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
            _destroy: false,
          },
        },
        {
          $lookup: {
            from: columnModel.COLUMN_COLLECTION_NAME,
            localField: "_id",
            foreignField: "boardId",
            // foreignField khoá ngoại lấy từ bảng column
            as: "columns",
            // to: cardModel.CARD_COLLECTION_NAME,
          },
        },
        {
          $lookup: {
            from: cardModel.CARD_COLLECTION_NAME,
            localField: "_id",
            foreignField: "boardId",
            // foreignField khoá ngoại lấy từ bảng card
            as: "cards",
          },
        },
      ])
      .toArray()
    return result[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const pushColumnOrderIds = async (column) => {
  try {
    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: new ObjectId(column.boardId),
        },
        {
          $push: {
            columnOrderIds: new ObjectId(column._id),
          },
        },
        {
          returnDocument: "after",
        },
      )
    return result || null
  } catch (error) {
    throw new Error(error)
  }
}
const update = async (id, updateData) => {
  try {
    Object.keys(updateData).forEach((key) => {
      if (INVALIED_UPDATE_FIELDS.includes(key)) {
        delete updateData[key]
      }
    })
    if (updateData.columnOrderIds) {
      updateData.columnOrderIds = updateData.columnOrderIds.map((id) => new ObjectId(id))
    }
    updateData.updatedAt = Date.now()
    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: new ObjectId(id),
        },
        {
          $set: updateData,
        },
        {
          returnDocument: "after",
        },
      )
    return result || null
  } catch (error) {
    throw new Error(error)
  }
}
const moveCardToDifferentColumn = async (id, updateData) => {
  try {
    Object.keys(updateData).forEach((key) => {
      if (INVALIED_UPDATE_FIELDS.includes(key)) {
        delete updateData[key]
      }
    })
    updateData.updatedAt = Date.now()
    console.log("updateData", updateData)
    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: new ObjectId(id),
        },
        {
          $set: updateData,
        },
        {
          returnDocument: "after",
        },
      )
    return result || null
  } catch (error) {
    throw new Error(error)
  }
}

const deleteByOneIdInBoard = async (targetColumn) => {
  try {
    const { boardId, columnId } = targetColumn
    const result = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .updateOne(
        { _id: new ObjectId(boardId) },
        {
          $pull: {
            columnOrderIds: new ObjectId(columnId),
          },
        },
      )

    return result || null
  } catch (error) {
    throw new Error(error)
  }
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails,
  pushColumnOrderIds,
  update,
  moveCardToDifferentColumn,
  deleteByOneIdInBoard,
}
