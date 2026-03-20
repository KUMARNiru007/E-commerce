import "dotenv/config";

export const MONGODB_URL =
    process.env.MONGODB_URL || "mongodb://localhost/amazon";

export const JWT_SECRET = process.env.JWT_SECRET || "somethingsecret";