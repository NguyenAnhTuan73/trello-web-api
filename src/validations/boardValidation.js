import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const creatNew = async (req, res, next) => {
  const conditionsReq = Joi.object({
    title: Joi.string().required().min(3).max(100).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
  });
  try {
    console.log(req.body);
    await conditionsReq.validateAsync(req.body, { abortEarly: false });
    // next();
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Note: API create list board" });
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message,
    });
    console.log(error);
  }
};
export const boardValidation = { creatNew };
