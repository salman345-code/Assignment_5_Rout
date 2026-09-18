import express from "express";
import { dbConnection } from "./src/database/dbConnection.js";
import { syncModels } from "./src/database/models/index.js";
import userRouter from "./src/modules/user/user.routes.js";
import postRouter from "./src/modules/post/post.routes.js";
import commentRouter from "./src/modules/comment/comment.routes.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

await dbConnection();
await syncModels();

app.listen(port, () => console.log(`Server running on port ${port} 🚀`));
