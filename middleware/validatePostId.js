const postDb = require("../posts/postDb");

function validatePostId(req, res, next) {
    // do your magic!
    const id = req.params.id;
    postDb.getById(id)
        .then(data => {
            if (!data) {
                res.status(404).json({ message: "invalid post id." })
            } else {
                next();
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: "something went wrong!" })
        })
}

module.exports = validatePostId;