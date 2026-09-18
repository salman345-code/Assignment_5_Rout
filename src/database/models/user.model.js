// سؤال 1 — Users model (using define) + email validation + checkPasswordLength + checkNameLength hook
import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";

export const User = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                // built-in validation (المطلوب رقم 1)
                isEmail: {
                    msg: "Email format is invalid",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // custom validation method (المطلوب رقم 2)
                checkPasswordLength(value) {
                    if (value.length <= 6) {
                        throw new Error("Password length must be greater than 6 characters");
                    }
                },
            },
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            defaultValue: "user",
        },
    },
    {
        timestamps: true, // createdAt & updatedAt
    }
);

// custom validation method جوه beforeCreate hook (المطلوب رقم 3)
User.addHook("beforeCreate", (user) => {
    checkNameLength(user.name);
});

function checkNameLength(name) {
    if (!name || name.length <= 2) {
        throw new Error("Name length must be greater than 2 characters");
    }
}