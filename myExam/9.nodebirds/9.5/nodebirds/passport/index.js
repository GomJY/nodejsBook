const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

module.exports = (passport) => {
    //req.session 객체에 어떤데이터를 저장할지 결정
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    //매 요청시 passport.session()미들웨어를 통해서 이 메서드가 호출
    //SerializeUser에 저장된 user.id를 받아 데이터베이스에서 사용자를 조회
    //req.user을 통해 로그인한 사용자의 정보를 가져올수 있다.
    passport.deserializeUser((id, done) => {
        User.findOne({ 
            where: { id },
            include: [{
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followers',
            }, {
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followings',  
            }],
        })
            .then(user => done(null, user)) //로그인한 사용자의 정보를 가져오는 메서드
            .catch(err => done(err));
    });

    local(passport);
    kakao(passport);
}