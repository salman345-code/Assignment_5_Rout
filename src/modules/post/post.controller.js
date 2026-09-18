import { Post, User, Comment } from "../../database/models/index.js";
import { sequelize } from "../../database/dbConnection.js";

// سؤال 1 — Create post (new instance & save)
export const createPost = async (req, res) => {
    try {
        const { title, content, userId } = req.body;

        const post = new Post({ title, content, userId });
        await post.save();

        res.status(201).json({ message: "Post created successfully." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 2 — Delete post (owner only)
export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;

        const post = await Post.findByPk(postId);
        if (!post) return res.status(404).json({ message: "Post not found." });

        if (post.userId != userId) {
            return res
                .status(403)
                .json({ message: "You are not authorized to delete this post." });
        }

        await post.destroy(); // soft delete بسبب paranoid
        res.status(200).json({ message: "Post deleted." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 3 — All posts with user & comments details

export const getPostsDetails = async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: ["id", "title"],
            include: [
                { model: User, attributes: ["id", "name"] },
                { model: Comment, attributes: ["id", "content"] },
            ],
        });

        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 4 — All posts with comments count
export const getPostsCommentCount = async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: [
                "id",
                "title",
                [sequelize.fn("COUNT", sequelize.col("comments.id")), "commentCount"],
            ],
            include: [{ model: Comment, attributes: [] }],
            group: ["post.id"],
        });

        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

