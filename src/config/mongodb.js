import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "~/config/environment";
//
// tuandev
// X3qU3reBp9aVcTP9

let trelloDatabaseInstance = null;

// Khởi tạo một đối tượng mongoClientIntance để connect với mongodb
const mongoClientIntance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
export const CONNECT_DB = async () => {
  await mongoClientIntance.connect();
  trelloDatabaseInstance = mongoClientIntance.db(env.DATABASE_NAME);
};
export const GET_DB = () => {
  if (!trelloDatabaseInstance)
    throw new Error("Must connect to Database first");
  return trelloDatabaseInstance;
};
export const CLOSE_DB = async () => {
  await mongoClientIntance.close();
};
