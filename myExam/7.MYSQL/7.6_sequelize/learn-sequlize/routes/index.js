var express = require('express');
var User = require('../models').User;

var router = express.Router();

// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll();
//     console.log("users : ", await users);
//     res.render(await users);
//   } catch(error) {
//     console.error(error);
//     next(error);
//   }
// });


router.get('/', function(req, res, next) {
  User.findAll()
    .then((users) => {
      // console.log(users);
      res.render('sequelize', { users });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    })
});

module.exports = router;
