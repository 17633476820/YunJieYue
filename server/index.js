var express = require('express'); //引入express模块

var mysql = require("mysql"); //引入mysql模块
var app = express(); //创建express的实例
const cors = require("cors");

const sqlClient = require("./config")



app.use(cors());


//注册接口
app.post('/register', function(req, res) {
    crossDomain: true,
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

    const { user_name, user_password } = req.query;

    const sql = "insert into user(user_name, user_password) values (?,?)";
    const arr = [user_name, user_password]
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.json({
                status: 200,
                msg: '注册成功'
            })
        } else {
            res.json({
                status: 401,
                msg: '注册失败'
            })
        }
    })


});
//登录接口
app.post('/login', function(req, res) {
    crossDomain: true,
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    console.log(req.query);
    const { user_name, user_password } = req.query;

    const sql = "select * from user where user_name=? and user_password=?";
    const arr = [user_name, user_password]
    sqlClient(sql, arr, result => {
        console.log(result);

        if (result.length > 0) {
            res.json({
                status: 200,
                user_name,
                msg: ["登陆成功", result[0].user_id]
            })
        } else {
            res.json({
                status: 401,
                msg: '登录失败'
            })
        }
    })


});
//展示所有图书接口
app.post('/book', function(req, res) {
    crossDomain: true,
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

    const sql = "select * from book";
    const arr = req.query
    sqlClient(sql, arr, result => {

        res.json({
            result: result
        })

    })

});
//查询指定图书接口
app.post('/getselectbook', function(req, res) {
    crossDomain: true,
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

    const { book_author, book_name, book_press } = req.query;


    const sql = "select * from book where book_author=? and book_name=? and book_press=?";

    const arr = [book_author, book_name, book_press]

    sqlClient(sql, arr, result => {
        console.log(result);

        if (result.length > 0) {
            res.json({
                status: 200,
                result
            })
        } else {
            res.json({
                status: 401,
                msg: '查询失败'
            })
        }
    })


});

//借阅图书接口
app.post('/borrowerbook', function(req, res) {
    crossDomain: true,
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

    const { book_status, book_borrower, book_borrowtime, book_returntime, book_id } = req.query;

    const sql = "update book set book_status=?,book_borrower=?,book_borrowtime=?,book_returntime=? where book_id=?";
    const arr = [book_status, book_borrower, book_borrowtime, book_returntime, book_id]
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.json({
                status: 200,
                msg: '借阅成功，请到借阅中心取书'
            })
        } else {
            res.json({
                status: 401,
                msg: '借阅失败'
            })
        }
    })


});
//展示借阅记录
app.post('/selectrecord', function(req, res) {
    crossDomain: true,
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')


    const sql = "select * from record  ";

    const arr = req.query

    sqlClient(sql, arr, result => {


        if (result.length > 0) {
            res.json({
                status: 200,
                msg: '查询成功',
                result
            })
        } else {
            res.json({
                status: 401,
                msg: '查询失败'
            })
        }
    })


});
//增加图书接口
app.post('/insertbook', function(req, res) {
    crossDomain: true,
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

    const { book_name, book_isbn, book_press, book_author, book_pagination, book_price, book_uploadtime, book_status } = req.query;

    const sql = "insert into book (book_name,book_isbn,book_press,book_author,book_pagination,book_price,book_uploadtime,book_status)values(?,?,?,?,?,?,?,0)";
    const arr = [book_name, book_isbn, book_press, book_author, book_pagination, book_price, book_uploadtime, book_status]
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.json({
                status: 200,
                msg: '增加图书成功'
            })
        } else {
            res.json({
                status: 401,
                msg: '增加图书失败'
            })
        }
    })


});

//更新编辑图书接口
app.post('/editbook', function(req, res) {
    crossDomain: true,
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

    const { book_name, book_isbn, book_press, book_author, book_pagination, book_price, book_id } = req.query;

    const sql = "update book set book_name=?,book_isbn=?,book_press=?,book_author=?,book_pagination=?,book_price=? where book_id=?";
    const arr = [book_name, book_isbn, book_press, book_author, book_pagination, book_price, book_id]
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.json({
                status: 200,
                msg: '编辑成功'
            })
        } else {
            res.json({
                status: 401,
                msg: '编辑失败'
            })
        }
    })


});
//删除图书接口
app.post('/deletebook', function(req, res) {
    crossDomain: true,
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

    const { book_id } = req.query;

    const sql = "delete from book where book_id=?";
    const arr = [book_id]
    sqlClient(sql, arr, result => {
        console.log(result);

        if (result.length > 0) {
            res.json({
                status: 200,
                user_name,
                msg: '删除成功'
            })
        } else {
            res.json({
                status: 401,
                msg: '删除失败'
            })
        }
    })


});
//查询当前用户借阅图书的接口
app.post('/cunrrentborrow', function(req, res) {
    crossDomain: true,
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

    const { book_borrower } = req.query;


    const sql = "select * from book where book_borrower=?  ";

    const arr = [book_borrower]

    sqlClient(sql, arr, result => {


        if (result.length > 0) {
            res.json({
                status: 200,
                msg: '查询成功',
                result
            })
        } else {
            res.json({
                status: 401,
                msg: '查询失败'
            })
        }
    })


});
//归还图书接口
app.post('/returbook', function(req, res) {
    crossDomain: true,
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

    const { book_id } = req.query;

    const sql = "update book set book_status=0,book_borrower=null,book_borrowtime=null,book_returntime=null where book_id=?";
    // const arr = [book_name, book_isbn, book_press, book_author, book_pagination, book_price, book_id]
    const arr = [book_id]
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.json({
                status: 200,
                msg: '归还成功'
            })
        } else {
            res.json({
                status: 401,
                msg: '归还失败'
            })
        }
    })

});
//增加借阅记录接口
app.post('/borrowrecord', function(req, res) {
    crossDomain: true,
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

    const { record_bookname, record_bookisbn, record_borrower, record_borrowtime, record_remandtime } = req.query;

    const sql = "insert into record( record_bookname, record_bookisbn, record_borrower, record_borrowtime, record_remandtime ) values (?,?,?,?,?)";
    const arr = [record_bookname, record_bookisbn, record_borrower, record_borrowtime, record_remandtime]
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.json({
                status: 200,
                msg: '记录数据成功'
            })
        } else {
            res.json({
                status: 401,
                msg: '记录数据失败'
            })
        }
    })


});
// connection.end();
app.listen(3000, function() {
    console.log('Server running at 3000 port');
});