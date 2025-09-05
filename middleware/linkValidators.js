const {body, param, validationResult} = require("express-validator");

const validate = (req, res, next) => {
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
validateParamLink = [
    param("linkID").isLength({min: 4}),
    validate
]
validatePutLink = [
    param("linkID").isLength({min: 4}),
    body("new_original_link").isURL().withMessage("must be a URL with name new_original_link"),
    validate
]
validateLink = [
    body("original_link"),
    validate
]

module.exports = {validateCreateLink, validateFrowardLink, validateLink, validateParamLink, validatePutLink};