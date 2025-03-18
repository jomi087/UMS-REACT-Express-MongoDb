const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500; 

  console.error("Error Handler Triggered:", err.stack); // Always log errors for debugging

  res.status(statusCode).json({
    message: statusCode === 500 
      ? "Something went wrong. Try again later." 
      : err.message,  
  });
};

export default errorHandler;
