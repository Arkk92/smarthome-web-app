import MongooseClient from "./mongoose/MongooseClient"

/**
 * Mongoose client instance for interacting with the database.
 *
 * @constant
 * @type {MongooseClient}
 */
const mongooseClient: MongooseClient = new MongooseClient()
mongooseClient.connect()

export { mongooseClient }