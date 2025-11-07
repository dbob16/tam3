import { env } from "$env/dynamic/private";
import fs from "fs";

export function readSettings() {
    if (fs.existsSync(env.SETTINGS_PATH)) {
        const rawFileData = fs.readFileSync(env.SETTINGS_PATH, 'utf-8');
        const fileData = JSON.parse(rawFileData);
        return fileData;
    } else {
        const fileData = {TAM3_REMOTE: env.TAM3_REMOTE || "", TAM3_REMOTE_KEY: env.TAM3_REMOTE_KEY || ""};
        fs.writeFileSync(env.SETTINGS_PATH, JSON.stringify(fileData, null, 2));
        return fileData;
    }
}

export function writeSettings(settingsObj) {
    fs.writeFileSync(env.SETTINGS_PATH, JSON.stringify(settingsObj, null, 2));
    return "File written successfully."
}