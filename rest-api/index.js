import express from "express";
import BodyParser from "body-parser";
import {REST_API_HOST, REST_API_PORT} from "../shared/constants/restApiConf.js";
import {BAD_REQUEST, errorsMessages, INTERNAL_ERROR, VALID_REQUEST} from "../shared/constants/httpCodes.js";
import {getEventsView, getNftBalanceView, getNftContractView, getTokensView, getTransactionsView} from "./views.js";


const app = express();


app.use(BodyParser.json());

const REST_API_MAIN_PATH = "/portfolio/api";


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "x-decommas-key,X-Requested-With,content-type,authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});


app.get(`${REST_API_MAIN_PATH}/tokens/:address`, async (req, res) => {
    try {
        const address = req?.params?.address;
        const data = await getTokensView(address)

        if (data) {
            res.status(VALID_REQUEST).json({
                status: VALID_REQUEST,
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
        res.status(INTERNAL_ERROR).json({
            status: INTERNAL_ERROR,
            name: errorsMessages[INTERNAL_ERROR].name,
            message: errorsMessages[INTERNAL_ERROR].message,
        });
    }
});


app.get(`${REST_API_MAIN_PATH}/events/:address`, async (req, res) => {
    try {
        const address = req?.params?.address;
        const data = await getEventsView(address)

        if (data) {
            res.status(VALID_REQUEST).json({
                status: VALID_REQUEST,
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
        res.status(INTERNAL_ERROR).json({
            status: INTERNAL_ERROR,
            name: errorsMessages[INTERNAL_ERROR].name,
            message: errorsMessages[INTERNAL_ERROR].message,
        });
    }
});


app.get(`${REST_API_MAIN_PATH}/transactions/:address`, async (req, res) => {
    try {
        const address = req?.params?.address;
        const data = await getTransactionsView(address)

        if (data) {
            res.status(VALID_REQUEST).json({
                status: VALID_REQUEST,
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
        res.status(INTERNAL_ERROR).json({
            status: INTERNAL_ERROR,
            name: errorsMessages[INTERNAL_ERROR].name,
            message: errorsMessages[INTERNAL_ERROR].message,
        });
    }
});

app.get(`${REST_API_MAIN_PATH}/nfts/:address`, async (req, res) => {
    try {
        const address = req?.params?.address;
        const data = await getNftBalanceView(address)

        if (data) {
            res.status(VALID_REQUEST).json({
                status: VALID_REQUEST,
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
        res.status(INTERNAL_ERROR).json({
            status: INTERNAL_ERROR,
            name: errorsMessages[INTERNAL_ERROR].name,
            message: errorsMessages[INTERNAL_ERROR].message,
        });
    }
});

app.get(`${REST_API_MAIN_PATH}/nft_contract/:address`, async (req, res) => {
    try {
        const address = req?.params?.address;
        const data = await getNftContractView(address)

        if (data) {
            res.status(VALID_REQUEST).json({
                status: VALID_REQUEST,
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
        res.status(INTERNAL_ERROR).json({
            status: INTERNAL_ERROR,
            name: errorsMessages[INTERNAL_ERROR].name,
            message: errorsMessages[INTERNAL_ERROR].message,
        });
    }
});


app.listen(REST_API_PORT, REST_API_HOST, () => {
    console.log(
        `🟢REST-API starting in http://${REST_API_HOST}:${REST_API_PORT}`
    );
});