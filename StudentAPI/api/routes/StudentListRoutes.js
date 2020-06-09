'use strict'

module.exports = function(app) {

  var studentList = require('../controllers/StudentListController');

  app.route('/student')
    .get(studentList.list_all_students)
    .post(studentList.create_student);
  
  app.route('/student/:studentId')
    .get(studentList.get_student)
    .put(studentList.update_student)
    .delete(studentList.delete_student);
};
