const express = require('express');
const app = express();
const videoRoutes = require("./routes/videos")
const cors = require('cors');
require('dotenv').config();
const {PORT} = process.env; 

app.use(cors())
app.use(express.json());

app.use((req, res, next) => {
  next();
})

app.use("/videos", videoRoutes);

app.listen(PORT, () => {
  console.log("server is listening on" + PORT );
})

