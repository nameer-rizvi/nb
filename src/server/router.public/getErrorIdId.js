// todo delete
async function getCollectionId(req, res) {
  res.json({ id: req.params.id });
}

module.exports = getCollectionId;
