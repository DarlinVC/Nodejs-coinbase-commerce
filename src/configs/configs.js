// calling and initializing dotenv.
const { config } = require("dotenv");
config();

// setting environment variables.
export const ENV = {
    Global: {
        port: process.env.PORT,
        DOMAIN: "http://localhost:"+process.env.PORT+"/",
        SECRET_KEY: process.env.SECRET_KEY
    },
    DB: {
        URL: process.env.DB_URL
    },
    Auth: {
        SECRET_KEY: process.env.SECRET_KEY
    },
    Coinbase_configs: {
        API_KEY: process.env.COINBASE_API_KEY,
        WEBHOOK_SECRET: process.env.COINBASE_WEBHOOK_SECRET
    }
};