import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("assignment5", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

export const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("DB connected ✅");
    } catch (error) {
        console.log("DB connection error ❌", error);
    }
};