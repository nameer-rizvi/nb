function postError(req, res) {
  if (res.locals.values.error?.message) {
    throw { ...res.locals.values.error, status: 201 };
  } else {
    res.sendStatus(403);
  }
}

module.exports = postError;
