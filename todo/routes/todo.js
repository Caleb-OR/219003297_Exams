
var router = require('express').Router();
var TYPES = require('tedious').TYPES;

/* GET task listing. */
router.get('/get', function (req, res) {

    req.sql("select * from TblTodoRecord")
        .into(res, '[]');

});

/* GET single task. */
router.get('/get:id', function (req, res) {
    
    req.sql("select * from TblTodoRecord where id = @id for json path, without_array_wrapper")
        .param('id', req.params.id, TYPES.Int)
        .into(res, '{}');

});

/* POST create task. */
router.post('/post', function (req, res) {
    
    req.sql("exec createTodo @TblTodoRecord")
        .param('todo', req.body, TYPES.NVarChar)
        
        .exec(res);

});

/* PUT update task. */
router.put('/update:id', function (req, res) {
    
    req.sql("exec updateTodo @id, @TblTodoRecord")
        .param('id', req.params.id, TYPES.Int)
        .param('todo', req.body, TYPES.NVarChar)
        .exec(res);

});

/* DELETE single task. */
router.delete('/delete:id', function (req, res) {
    
    req.sql("delete from TblTodoRecord where id = @id")
        .param('id', req.params.id, TYPES.Int)
        .exec(res);

});

module.exports = router;