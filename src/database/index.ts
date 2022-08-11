import { pgDataSource } from "../config/configDB";
const dotenv = require("dotenv");
dotenv.config();

// connection to database(postgreSQL) while initializing
export const DBconnection = async () => {
    const client = await pgDataSource.initialize();
    try {
        if (client.isInitialized) {
            console.log(
                "\x1b[33m%s\x1b[0m",
                `Database is initialized and Connected...`
            );
            const presentConnectionDBname = await client
                .createQueryRunner()
                .getCurrentDatabase();
            console.log("CONNECTION DATABASE NAME:", presentConnectionDBname);
            // if (process.env.NODE_ENV !== "production") {
            //     syncORnotSyncWithDatabase(client);
            // }

            return client;
        } else {
            throw new Error("Unable to connect to database");
        }
    } catch (error) {
        console.log("Unable to Connect!", error);
    }
};

// at first check env varibale and do according to.
// Sync MUST be turn FALSE when release into Production
const syncORnotSyncWithDatabase = (client) => {
    if (Boolean(process.env.TYPEORM_SYNC_DEV)) {
        client.synchronize();
        console.log("Auto Synchronize is ON");
        return;
    } else {
        console.log("Auto Synchronize is OFF");
    }
};
