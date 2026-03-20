import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { MONGODB_URL } from "./config.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

mongoose
    .connect(MONGODB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error.message));

const app = express();

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});