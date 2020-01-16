const userDb = require("../users/userDb");

function validateUserId(req, res, next) {
    // do your magic!
    const id = req.params.id;
    userDb.getById(id)
        .then(data => {
            if (!data) {
                res.status(404).json({ message: "invalid user id." })
            } else {
                next();
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: "something went wrong." })
        })
}

module.exports = validateUserId;