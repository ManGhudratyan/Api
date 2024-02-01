const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router =require('./routes/index');
const cors = require('./middlewares/cors');
const HttpError  = require("http-errors");

dotenv.config();

// TODO global error handler

const {MONGO_URL} = process.env;
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connection is successful"))
  .catch((err) => {
    console.error(err);
  });

app.use(cors);
app.use(express.json());
app.use(router);
app.use((req, res, next) => {
  throw HttpError(404, `can't find ${req.originalUrl} on this server`, { error: { message: 'page not found' } });
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json({
    code: err.status,
    status: 'error',
    message: err.message,
    errors: err.error,
    stack: err.stack,
  });
});
app.listen(8800, () => {
  console.log("Server is running!");
});
