const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/configs/db");

dotenv.config();
connectDB();

const dms = express();
dms.use(express.json());

//display app in browser 
dms.get("/", (req, res) => {
  res.send("Hi. Welcome to the Only Delivery Management API You'll Ever Need.");
});
const PORT = process.env.DMS_PORT;
  dms.listen(PORT, () => {
    console.log(
        `DMS Server is now live on ${PORT}`
    );
  });

//const RegoRouter = require("./src/register/registerRoute");
//const loginRouter = require("./src/login/loginRoute");
//const transferRouter = require("./src/coreBanking/transferRoute");
//const balRouter = require("./src/coreBanking/balanceRoute");
//const tH_router = require("./src/coreBanking/transactionHistoryRoute");
//const tH_router = require("./src/coreBanking/transactionHistoryRoute")

//bank.use("/api/account", RegoRouter);
//bank.use("/api/account", loginRouter);
//bank.use("/api/account/funds", transferRouter);
//bank.use("/api/account", balRouter);
//bank.use("/api/account/view", tH_router);
//bank.use("/api/account/view_one", tH_router);

module.exports = dms;
