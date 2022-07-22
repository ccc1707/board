const passport = require('passport');
const local = require('./localStrategy');

const db = require('../database/connect/mysql');

module.exports = ()=>{
    passport.serializeUser((user,done)=>{
        done(null, user.USER_ID);
    });

    passport.deserializeUser(async (id, done)=>{
        var result = await db.execute(`SELECT * FROM tbl_user WHERE user_id = '${id}'`)
        if(result == "err") {
            console.log("DB쿼리 실패");
            done("err");
        } else {
            var userData = {
                USER_ID : result.rows[0].USER_ID
            }
            done(null, userData);
        }
    })

    local();
}