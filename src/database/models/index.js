// الـ Relations (الفورين كيز)
import { sequelize } from "../dbConnection.js";
import { User } from "./user.model.js";
import { Post } from "./post.model.js";
import { Comment } from "./comment.model.js";

// User - Post
User.hasMany(Post, { foreignKey: "userId", onDelete: "CASCADE" });
Post.belongsTo(User, { foreignKey: "userId" });

// Post - Comment
Post.hasMany(Comment, { foreignKey: "postId", onDelete: "CASCADE" });
Comment.belongsTo(Post, { foreignKey: "postId" });

// User - Comment
User.hasMany(Comment, { foreignKey: "userId", onDelete: "CASCADE" });
Comment.belongsTo(User, { foreignKey: "userId" });

export const syncModels = async () => {
    await sequelize.sync({ alter: true });
    console.log("Models synced ✅");
};

export { User, Post, Comment };