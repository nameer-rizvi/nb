// eslint-disable-next-line
module.exports = (err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
};
