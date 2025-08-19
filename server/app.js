const express = require("express");
const app = express();
const port = 3000;
const web = require("./routes/web");
const connectDB = require("./db/connectDB");
const fileUpload = require("express-fileupload");
var cookieParser = require("cookie-parser");

require("dotenv").config();

//token get cookie
const cors = require("cors");

//token get cookie
app.use(
  cors({
    origin: "http://localhost:5173", //your frontend domain
    credentials: true, //allow credentials (cookies)
  })
);

app.use(cookieParser());

// image upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//connectDB
connectDB();

app.use(express.json());

app.use("/api", web); //localhost:3000/api/
app.listen(process.env.PORT, console.log(`Server is running on port:3000`));
