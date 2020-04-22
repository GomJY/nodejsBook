const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

//이미지가 업로드할 uploads폴더가 있는지 확인하고 없으면 생성
fs.readdir('uploads', (err) => {
    if(err) {
        console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
        fs.mkdirSync('uploads');
    }
});

const upload = multer({
    //storage(파일저장방식,경로,파일명등 설정):  multer.diskStorage(이미지 서버에 저장)
    storage: multer.diskStorage({
        //저장결로 설정
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        //파일명설정 기존이름(file.originalname)업로드날짜.확장자
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        },
    }),
    //최대이미지 허용량 현재 10MB
    limits: { fileSize: 5 * 1024 * 1024 },
});
//이미지 저장
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
});

const upload2 = multer();
// /post 요청시
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
    try { 
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            userId: req.user.id,
        });
        const hashtags = req.body.content.match(/#[^\s]*/g);
        if(hashtags) {
            const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
                where: { title: tag.slice(1).toLowerCase() },
            })));
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;