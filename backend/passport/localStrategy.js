const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const db = require('../database/db');

module.exports = ()=>{
    passport.use(new LocalStrategy({
        usernameField : 'id', //req.body의 데이터값
        passwordField : 'pw'
    }, async (id, pw, done)=>{

        var result = await db.execute(`SELECT * FROM tbl_user WHERE user_id = '${id}'`);
        if(result == "err") {
            console.log("DB쿼리 실패");
        } else {
            if(result.rows.length != 0) { //해당 아이디를 찾았을 경우
                var exUser = result.rows[0];
                const pwCheck = await bcrypt.compare(pw, exUser.USER_PWD);
                if(pwCheck) {
                    done(null, exUser);
                } else {
                    done(null, false, {msg : "비밀번호가 일치하지 않습니다."});
                }

            } else {
                done(null, false, {msg : "가입되지 않은 회원입니다."});
            }
        }

    }));
}