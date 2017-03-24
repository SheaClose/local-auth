const db = require('../db');
const bcrypt = require('bcryptjs');

function hash(given) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(given, salt)
}

module.exports = {
  create: (req, res, next) => {
    const userInfo = [
      req.body.name,
      req.body.email,
      hash(req.body.password)
    ]

    db.createUser(userInfo, function(err, users) {
      if (err) { return next(err) }
      const data = users[0];
      delete data.password
      res.status(200).json(data);
    });
  },

  me: (req, res, next) => {
    if (!req.user) return res.status(403).send('current user not defined');
    const data = req.user;
    delete data.password;
    res.status(200).json(data);
  }
};
