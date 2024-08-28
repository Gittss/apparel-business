import express from "express";
import bodyParser from "body-parser";
import vendorRoutes from "./routes/vendorRoute";
import userRoutes from "./routes/userRoute";

const app = express();

app.use(bodyParser.json());
app.use("/api/vendor", vendorRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
