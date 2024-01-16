import fs from "fs";

export const readFile = (fileName) => {
    try {
        return JSON.parse(fs.readFileSync(fileName, { encoding: "utf8" }));
    } catch (error) {
        return {};
    }
};
