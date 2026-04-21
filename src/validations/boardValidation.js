import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import ApiError from "~/utils/ApiError";
import { BOARD_TYPES } from "~/utils/constants";

const creatNew = async (req, res, next) => {
  const conditionsReq = Joi.object({
    title: Joi.string().required().min(3).max(100).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string()
      .valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE)
      .required(),
  });
  try {
    // abortEarly:false --> trả ra tất cả các lỗi validations

    await conditionsReq.validateAsync(req.body, { abortEarly: false });
    // validate xong thì req chạy tiếp sang controller
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message),
    );

    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message,
    // });
  }
};
export const boardValidation = { creatNew };
