var express = require('express');
var { User, Comment } = require('../models');

var router = express.Router();

//SELECT
router.get('/:id', (req, res, next) => {
    Comment.findAll({
      include: {    //include옵션이 관련 있는 모델을 불러 온다. hasMany, belongsTo로 연결해야 가능(models/index.js 참고)
        model: User,                    //User 모델에서 id에 해당하는 값을 찾기
        where: { id: req.params.id },   //
      },
    })
      .then((comments) => {
        console.log('comments : ', comments);
        res.json(comments);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
});

router.get('/', (req, res, next) => {
   Comment.findAll()
    .then((users) => {
        res.json(users);
    })
    .catch((err) => {
        console.error(err);
        next(err);
    }); 
});

//CREATE
router.post('/', function(req, res, next) {
    console.log("CREATE:",req.body.id, req.body.comment);
    Comment.create({                    //create덧글 생성
        commenter : req.body.id,
        comment: req.body.comment,
    })
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

//UPDATE
router.patch('/:id', function(req, res, next) {
    Comment.update({ comment: req.body.comment }, { where : { id : req.params.id } })
        .then((result) => {
            console.log("UPDATE",result);
            res.json(result);
        })
        .catch((err) => {
            // console.error(err);
            next(err);
        });
});

//DELETE
router.delete('/:id', function(req, res, next) {
    Comment.destroy( { where: { id: req.params.id } })
        .then((result) => {
            console.log("DELETE",result);
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

module.exports = router;