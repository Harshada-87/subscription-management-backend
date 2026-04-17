const errorMiddleware = (err, req, res, next) => {
  try {
    const error = { ...err };
    error.message = err.message;
    console.log(err);

    //  1. CastError (Invalid MongoDB ID)
    if (err.name === "CastError") {
      const message = "Resource not found";
      error = new Error(message);
      error.statusCode = 404;
    }

    // 2. Duplicate key error
    if (err.code === "11000") {
      const message = "Duplicate field value entered";
      error = new Error(message);
      error.statusCode = 400;
    }

    // 3. Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(","));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server error",
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
