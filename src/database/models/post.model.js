// سؤال 2 — Posts model (using init) + paranoid
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../dbConnection.js";

export class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "post",
        timestamps: true,
        paranoid: true, // soft delete (المطلوب رقم 1)
    }
);