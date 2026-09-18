import { Router } from "express";
import {
    createComments,
    updateComment,
    findOrCreateComment,
    searchComments,
    getNewestComments,
    getCommentDetails,
} from "./comment.controller.js";

const commentRouter = Router();

commentRouter.post("/", createComments);
commentRouter.post("/find-or-create", findOrCreateComment);
commentRouter.get("/search", searchComments);
commentRouter.get("/newest/:postId", getNewestComments);
commentRouter.get("/details/:id", getCommentDetails);
commentRouter.patch("/:commentId", updateComment);

export default commentRouter;