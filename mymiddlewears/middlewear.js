module.exports = function(req, res, next) {
    console.log(`Time: ${Date.now()}`);

    next();
};






const mymiddlewears = (req, res, next) => {

    next();
};



module.exports = mymiddlewears;
    
//module.exports = function(req, res, next) {
   // console.log(`Time: ${Date.now()}`);

  //  next();
//};