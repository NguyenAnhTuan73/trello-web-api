import { StatusCodes } from "http-status-codes"
import Joi from "joi"
import ApiError from "~/utils/ApiError"
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators"

const creatNew = async (req, res, next) => {
  const conditionsReq = Joi.object({
    title: Joi.string().required().min(3).max(100).trim().strict(),
    boardId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
  })
  try {
    // abortEarly:false --> trả ra tất cả các lỗi validations

    await conditionsReq.validateAsync(req.body, { abortEarly: false })
    // validate xong thì req chạy tiếp sang controller
    next()
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message),
    )
  }
}
export const columnValidation = { creatNew }
