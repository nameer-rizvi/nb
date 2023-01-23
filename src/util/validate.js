const dictionary = require("./dictionary");
const simpul_validate = require("simpul-validate");

const validate = simpul_validate(dictionary);

module.exports = validate;

// https://github.com/nameer-rizvi/simpul-validate/tree/main/src
