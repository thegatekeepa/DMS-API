const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/configs/db");

dotenv.config();
connectDB();

const dms = express();
dms.use(express.json());

//display app in browser 
dms.get("/", (req, res) => {
  res.send(
    "Hi. Welcome to the Only Delivery Management API You'll Ever Need."
);
});
const PORT = process.env.DMS_PORT;
  dms.listen(PORT, () => {
    console.log(
        `DMS Server is now live on ${PORT}`
    );
  });

const authRouter = require("./src/routes/auth.routes");
const userRouter = require("./src/routes/user.routes");
const deliRouter = require("./src/routes/delivery.routes");
const prodRouter = require("./src/routes/proD.routes");
const dhRouter = require("./src/routes/deliveryHistory.routes");

dms.use("/api/user", authRouter);
dms.use("/api/getlistof", userRouter);
dms.use("/api/get", userRouter);
dms.use("/api/profile/update", userRouter);
dms.use("/api/profile", userRouter);

dms.use("/api/delivery", deliRouter);
dms.use("/api/update", deliRouter);
dms.use("/api/proof/delivery", prodRouter);
dms.use("/api/history/delivery", dhRouter);

module.exports = dms;
