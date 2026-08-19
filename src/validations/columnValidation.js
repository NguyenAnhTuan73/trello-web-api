import { StatusCodes } from "http-status-codes"
import Joi from "joi"
import ApiError from "~/utils/ApiError"
import { BOARD_TYPES } from "~/utils/constants"
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators"

const creatNew = async (req, res, next) => {
  const conditionsReq = Joi.object({
    title: Joi.string().required().min(3).max(100).trim().strict(),
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  })
  try {
    // abortEarly:false --> trả ra tất cả các lỗi validations

    await conditionsReq.validateAsync(req.body, { abortEarly: false })
    // validate xong thì req chạy tiếp sang controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}
const updateColumn = async (req, res, next) => {
  const conditionsReq = Joi.object({
    title: Joi.string().min(3).max(100).trim().strict(),
    description: Joi.string().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE),
    columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)),
  })
  try {
    // abortEarly:false --> trả ra tất cả các lỗi validations
    // allowUnknown:true --> cho phép req.body để không cần đầy đủ
    await conditionsReq.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    })
    // validate xong thì req chạy tiếp sang controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))

    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message,
    // });
  }
}
const deleteColumn = async (req, res, next) => {
  const conditionsReq = Joi.object({
    id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
  })
  try {
    await conditionsReq.validateAsync(req.params)
    // validate xong thì req chạy tiếp sang controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))

    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message,
    // });
  }
}
export const columnValidation = { creatNew, updateColumn, deleteColumn }
