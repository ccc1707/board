var express = require('express');
const router = express.Router()

const db = require('../database/connect/mysql')


// 게시판 목록
router.get('/getpost', async(req, res) => {
    console.log("getpost")
    // const result = await db.execute(`SELECT * FROM tbl_post`)
    // const result = db.query(`SELECT * FROM tbl_post`)
    db.query(
        `SELECT * fROM tbl_post, tbl_user WHERE tbl_user.user_id = tbl_post.user_id`,
        function(err, rows) {
            if(err) {
                console.log("err : " + err);
                res.send('err');
            } else {
                console.log(rows)
                res.send(rows)
            }
        }
    )
})
// POST_DATE,  date(now(),'yyyy.mm.dd hh24:mi'),
router.post('/postwrite', async(req, res) => {
    db.query(
        `INSERT INTO tbl_post(POST_TITLE, POST_CONTENT, POST_CONTENTT, POST_CONTENTTT, POST_DATE, USER_ID) values ('${req.body.title}', '${req.body.content}', '${req.body.contentt}','${req.body.contenttt}', date_format(now(),'%Y-%m-%d %T'), '${req.body.user}')`,
        function(err, rows) {
            if(err) {
                console.log("err : " + err);
                res.send(err);  
            } else {
                console.log(rows)
                res.send(rows)
            }
        }
    )
})

// 삭제
router.post('/postdelete', async(req, res) => {
    console.log("postdelete")
    db.query(
        `DELETE FROM tbl_post WHERE USER_ID = '${req.body.user}' and POST_CODE = '${req.body.code}'`,
        function(err, rows) {
            if(err) {
                console.log("err : " + err);
                res.send(err);
            } else {
                console.log(rows)
                res.send(rows)
            }
        }
    )
})

// 조회수

    router.post('/postview', async(req, res) => {
        if(req.body.userAuth == "관리자") {
            db.query(
                `UPDATE tbl_post SET post_manager_view = post_manager_view +1 WHERE post_code = '${req.body.code}'`,
                function(err, rows) {
                    if(err) {
                        console.log("err : " + err);
                        res.send(err);
                    } else {
                        console.log(rows)
                        res.send(rows)
                    }    
                } 
            )
        } else if(req.body.userAuth == "일반인") {
            db.query(
                `UPDATE tbl_post SET post_general_view = post_general_view +1 WHERE post_code = '${req.body.code}'`,
                function(err, rows) {
                    if(err) {
                        console.log("err : " + err);
                        res.send(err);
                    } else {
                        console.log(rows)
                        res.send(rows)
                    }
                }
            )
        }
    })



// 추천
router.post('/postupdate', async(req, res) => {
    console.log("postupdate")
    db.query(
        `UPDATE tbl_post SET post_vote = post_vote +1 WHERE post_code = '${req.body.code}'`,
        function(err, rows) {
            if(err) {
                console.log("err : " + err);
                res.send(err);
            } else {
                console.log(rows)
                res.send(rows)
            }
        }
    )
})
module.exports = router;