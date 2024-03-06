const errorHandler = (err, req, res, next) => {
  console.log(err.stack, "THis is me");

  res.status(500).json({ error: "This is error" });
};

export default errorHandler;
