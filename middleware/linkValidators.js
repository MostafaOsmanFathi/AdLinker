const {body, param, validationResult} = require("express-validator");

const validate = (req, res, next) => {
    console.log("validating link")
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json({errors: errors})
    }
    next()
}
validateCreateLink = [
    body("original_link").isURL().withMessage("must be a URL"),
    validate
]

validateFrowardLink = [
    param("linkID").isLength({min: 4}),
    validate
]
validateLink = [
    body("original_link"),
]

module.exports = {validateCreateLink, validateFrowardLink, validateLink};