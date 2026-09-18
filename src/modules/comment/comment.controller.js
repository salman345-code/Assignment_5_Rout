import { Comment, User, Post } from "../../database/models/index.js";
import { Op } from "sequelize";

// سؤال 1 — Bulk create comments
export const createComments = async (req, res) => {
    try {
        const { comments } = req.body;
        await Comment.bulkCreate(comments);

        res.status(201).json({ message: "comments created." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 2 — Update comment (owner only)
export const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId, content } = req.body;

        const comment = await Comment.findByPk(commentId);
        if (!comment)
            return res.status(404).json({ message: "comment not found." });

        if (comment.userId != userId) {
            return res
                .status(403)
                .json({ message: "You are not authorized to update this comment." });
        }

        comment.content = content;
        await comment.save();

        res.status(200).json({ message: "Comment updated." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 3 — Find or create
export const findOrCreateComment = async (req, res) => {
    try {
        const { postId, userId, content } = req.body;

        const [comment, created] = await Comment.findOrCreate({
            where: { postId, userId, content },
        });

        res.status(200).json({ comment, created });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 4 — Search by word (find and count)
export const searchComments = async (req, res) => {
    try {
        const { word } = req.query;

        const { count, rows } = await Comment.findAndCountAll({
            where: { content: { [Op.like]: `%${word}%` } },
        });

        if (count === 0)
            return res.status(404).json({ message: "no comments found." });

        res.status(200).json({ count, comments: rows });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 5 — 3 most recent comments for a post
export const getNewestComments = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.findAll({
            where: { postId },
            attributes: ["id", "content", "createdAt"],
            order: [["createdAt", "DESC"]],
            limit: 3,
        });

        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// سؤال 6 — Comment by PK with user & post info
export const getCommentDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByPk(id, {
            attributes: ["id", "content"],
            include: [
                { model: User, attributes: ["id", "name", "email"] },
                { model: Post, attributes: ["id", "title", "content"] },
            ],
        });

        if (!comment)
            return res.status(404).json({ message: "no comment found" });

        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
