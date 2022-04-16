const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!! SHUTTING DOWN...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

//Connect to Database
mongoose
  .connect(DB, {
    // .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful"));

const port = process.env.PORT || 3000;
//Run Server
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

//Handling unhandled rejections (DB connection fail)
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!! SHUTTING DOWN...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECIEVED. Shutting Down Gracefully");
  server.close(() => {
    console.log("PROCESS TERMINATED!");
  });
});
