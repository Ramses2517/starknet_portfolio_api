import fs from "fs";

export const writeToFile = (fileName, data) => {
    fs.writeFileSync(fileName, JSON.stringify(data));
};
