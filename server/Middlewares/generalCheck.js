// middlewares to check the body of the incoming request

function bodyCheck(req, res, next) {
  if (!req.body) return res.status(400).json({ msg: "Seriously?" });
  next();
}

module.exports = { bodyCheck };
