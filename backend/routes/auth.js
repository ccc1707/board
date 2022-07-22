var express = require('express');
const router = express.Router()

const db = require('../database/connect/mysql')

// 로그인
router.post('/postlogin', async(req, res) => {
    console.log("postlogin")
    // const result = await db.execute(`SELECT * FROM tbl_post`)
    // const result = db.query(`SELECT * FROM tbl_post`)
    db.query(
        `SELECT * FROM tbl_user WHERE USER_ID = '${req.body.id}' and USER_PWD = '${req.body.pw}'`,
        function(err, rows) {
            if(rows.length != 0) {
                console.log(rows)
                res.send(rows)
            } else {
                console.log("err : " + err);
                res.send('err');
            }
        }
    )
})

module.exports = router;