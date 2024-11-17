function bodyCheck(req, res, next) {
  if (!req.body) return res.status(400).json({ msg: "Seriously?" });
  next();
}

module.exports = { bodyCheck };
