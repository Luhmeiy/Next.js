const Pocketbase = require("pocketbase/cjs");

export const pb = new Pocketbase(process.env.PB_URL);
