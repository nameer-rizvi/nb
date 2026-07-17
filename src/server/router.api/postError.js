function postError(req, res) {
  if (req.ctx.values.error?.message) {
    throw { ...req.ctx.values.error, status: 201 };
  } else {
    res.sendStatus(403);
  }
}

module.exports = postError;
