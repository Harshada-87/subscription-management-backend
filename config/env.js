import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { SERVER_URL , PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN , QSTASH_TOKEN, QSTASH_URL} = process.env;
