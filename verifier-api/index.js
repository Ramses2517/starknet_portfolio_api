import express from "express";
import {tokenVerifier} from "./tokenVerifier.js";
import {writeToFile} from "../shared/utils/writeToFile.js";
import {sleep} from "../shared/utils/sleep.js";
import {THIRTY_SECONDS} from "../shared/constants/limits.js";
import {readFile} from "../shared/utils/readFile.js";
import {BAD_REQUEST, errorsMessages, INTERNAL_ERROR, VALID_REQUEST} from "../shared/constants/httpCodes.js";
import {TOKEN_VERIFIER_API_HOST, TOKEN_VERIFIER_API_PORT} from "../shared/constants/verifierApiConf.js";
import {getNativeCoinData} from "./getNativeCoinData.js";


const mainPath = "/verifier/api";

let tokenAnswer;

const tokenFileName = "data/verified_tokens.json";

const tokenListener = async () => {
    const startMessage = `🟡Start token verification`;
    const endMessage = `🟡End token verification`;
    console.log(startMessage);
    tokenAnswer = readFile(tokenFileName);

    while (true) {
        console.log(startMessage);
        tokenAnswer = await tokenVerifier();
        writeToFile(tokenFileName, tokenAnswer);
        console.log(endMessage);
        await sleep(THIRTY_SECONDS);
    }
};


tokenListener();

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.get(`${mainPath}/tokens/:chain`, async (req, res) => {
    try {
        const chainParameter = req?.params?.chain?.toLowerCase();
        res.status(VALID_REQUEST).json({
            status: "ok",
            result: tokenAnswer || [],
        });
    } catch (error) {
        console.log(error);
        res.status(INTERNAL_ERROR).json({
            status: INTERNAL_ERROR,
            name: errorsMessages[INTERNAL_ERROR].name,
            message: errorsMessages[INTERNAL_ERROR].message,
        });
    }
});

app.get(`${mainPath}/native/:chain`, async (req, res) => {
    try {
        const chainParameter = req?.params?.chain?.toLowerCase();
        const data = await getNativeCoinData(chainParameter);
        if (data) {
            res.status(VALID_REQUEST).json({
                status: "ok",
                result: data,
            });
        } else {
            res.status(BAD_REQUEST).json({
                status: BAD_REQUEST,
                name: errorsMessages[BAD_REQUEST].name,
                message: errorsMessages[BAD_REQUEST].message,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(INTERNAL_ERROR).json({
            status: INTERNAL_ERROR,
            name: errorsMessages[INTERNAL_ERROR].name,
            message: errorsMessages[INTERNAL_ERROR].message,
        });
    }
});


app.listen(TOKEN_VERIFIER_API_PORT, TOKEN_VERIFIER_API_HOST, () => {
    console.log(
        `🟢TOKEN-VERIFIER-API starting in http://${TOKEN_VERIFIER_API_HOST}:${TOKEN_VERIFIER_API_PORT}`
    );
});
