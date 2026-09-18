/* eslint-disable no-console */
import exitHook from "async-exit-hook"
import { CLOSE_DB, CONNECT_DB } from "~/config/mongodb"
import "dotenv/config"
import { env } from "~/config/environment"
import { APIs_V1 } from "~/routes/v1"
import { errorHandlingMiddleware } from "~/middlewares/errorHandlingMiddleware"
import { corsOptions } from "~/config/cors"
const express = require("express")
const cors = require("cors")
const START_SERVER = () => {
  const app = express()
  app.use(express.json())

  app.use(cors(corsOptions))
  app.use("/v1", APIs_V1)
  // Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  if (env.BUILD_MODE === "production") {
    app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
      console.log(`Server is running in production mode on ${process.env.APP_HOST}:${process.env.APP_PORT}`)
    })
  } else {
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(`Server is running in development mode on ${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}`)
    })
  }

  
}
;(async () => {
  try {
    await CONNECT_DB()
    console.log("2.Connected to MongoDB")
    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
})()
