/*
* @author: Indu Munagapati
* Creating and Verifying JWT
*/

const jwt = require("jsonwebtoken")

const verifyJWT = (req,res,next) => {
    const token = req.headers.token;

    if(token) {
        jwt.verify(token, "WEBGROUP16", (err, decode) => {
            if(err) {
                res.status(401).json({
                    "message" : "Unauthorized user"
                })
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({
            "message" : "Unauthorized user"
        })
    }
}

const createJWT = (emailAddress) => {
    const token = jwt.sign(
        {emailAddress}, "WEBGROUP16"
    );
    return token;
}

module.exports = {createJWT, verifyJWT};