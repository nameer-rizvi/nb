const jsontxt = require("jsontxt");
const { isArray, isObject, isString } = require("simpul");

module.exports = (req, res, next) => {
  try {
    const currentJSONText = jsontxt.read();

    const appendedJSONText = isArray(currentJSONText)
      ? [...currentJSONText, ...res.locals]
      : isObject(currentJSONText)
      ? { ...currentJSONText, ...res.locals }
      : isString(currentJSONText)
      ? currentJSONText + res.locals
      : res.locals;

    jsontxt.write(appendedJSONText);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
