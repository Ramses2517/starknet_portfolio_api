import path, {dirname} from "path";
import {fileURLToPath} from "url";
import * as dotenv from "dotenv";

const envPath = "../../.env";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({
    path: path.join(__dirname, envPath),
});

export const REST_API_HOST = process.env.REST_API_HOST;
export const REST_API_PORT = process.env.REST_API_PORT;
export const STARKNET_API_KEY = process.env.STARKNET_API_KEY;
export const OKLINK_API_KEY = process.env.OKLINK_API_KEY;