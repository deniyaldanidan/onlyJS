const handleValidationError = (error)=>{
    return Object.keys(error.errors).filter(Boolean).map(errKey=> ({ [errKey] :  error.errors[errKey].message}));
}

module.exports = handleValidationError;