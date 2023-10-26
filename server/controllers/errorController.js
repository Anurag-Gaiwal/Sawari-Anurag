const AppError = require('./../utils/appError');

const handleDuplicateDB = err => {
    const value = err.errmsg.match(/(["'])(.*?[^\\])\1/)[2];
    console.log(`VALUE : ${value}`);
    const message = `Duplicate field value : ${value}. Please enter a different name`;
    return new AppError(message, 400);
}

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path} : ${err.value}.`;
    return new AppError(message, 400);
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
        name: err.name
    });
}

const sendErrorProd = (err, res) => {
    // Operational, trusted error --> Sends message to client :)
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    // Programming OR other unknown error : Don't leak error details.
    else {

        //1) Log Error :    
        console.log('ERROR 💥💥', err);

        //2) Send Generic Errors : 
        res.status(500).json({
            status: 'Error',
            message: 'Something went very wrong'
        })
    }


}

module.exports = (err, req, res, next) => {
    // console.log(err.stack)

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        // .... Thoda locha hai idhar : Destructuring is not working here.  
        // let error = { ...err };

        // --> Works without this line also.
        // let error = JSON.stringify(err); 

        if (err.name === "CastError") {
            err = handleCastErrorDB(err); 
        }

        if(err.code === 11000) {
            err = handleDuplicateDB(err);
        }
        
        sendErrorProd(err, res);

    }
}