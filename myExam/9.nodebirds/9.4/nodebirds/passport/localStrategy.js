const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

//(passport) => { passport.use(new LocalStrategy({전략 설정}), async () => {로그인 확인} }
module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',     //req.body.email
        passwordField: 'password',  //req.body.password
    }, async (email, password, done) => { //async ([데이터1], [데이터2], ... [done])
        try{
            const exUser = await User.findOne({ where: { email } });
            if (exUser) {
                //비밀번호 해쉬화하여서 db에 저장된 pwd와 비교
                const result = await bcrypt.compare(password, exUser.password); 
                if (result) {   //로그인성공
                    done(null, exUser); 
                } else {        //로그인 실패시
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                }
            } else {            //로그인 실패시
                done(null, false, { message: '가입되지 않은 회원입니다.' });
            }
        } catch(error) {        //서버 에러시
            console.error(error);
            done(error);
        }
    }));
};