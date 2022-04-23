const app = require("./app");
const mongoose = require("mongoose");

const dotenv = require("dotenv");

//Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!! SHUTTING DOWN...");
  console.log(err.name, err.message);
  process.exit(1);
});

//env variables
dotenv.config({ path: "./config.env" });

//DB URL
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

//Run Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

//Handling unhandled rejections (ex: DB connection failed)
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
