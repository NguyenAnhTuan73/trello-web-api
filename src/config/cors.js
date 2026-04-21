import { StatusCodes } from "http-status-codes";
import { env } from "~/config/environment";
import ApiError from "~/utils/ApiError";
import { allowedOrigins } from "~/utils/constants";

export const corsOptions = {
  origin: function (origin, callback) {
    // Cho phép request không có origin (Postman, mobile app...)
    if (!origin && env.BUILD_MODE === "dev") return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(
        new ApiError(
          StatusCodes.FORBIDDEN,
          `${origin} not allowed by CORS Policy`,
        ),
      );
    }
  },
  optionSuccessStatus: 200,
  credentials: true,
};
