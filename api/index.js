module.exports = function (req, res) {
  res.json({ ok: true, url: req.url });
};
