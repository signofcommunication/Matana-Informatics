import express from "express";
import bodyParser from "body-parser";
import router from "./routes/routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Route
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
