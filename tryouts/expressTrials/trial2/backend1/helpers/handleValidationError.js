const handleValidationError = (error)=>{
    // return Object.keys(error.errors).filter(Boolean).map(errKey=> ({ [errKey] :  error.errors[errKey].message}));
    const errObj = {};
    Object.keys(error.errors).filter(Boolean).forEach(key=>{
        errObj[key] = error.errors[key].message
    })
    return errObj;
}

module.exports = handleValidationError;