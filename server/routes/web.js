const express = require('express')
const ContactController = require('../controllers/ContactController')
const TeacherController = require('../controllers/teacherController')
const CourseController = require('../controllers/coursecontroller')
const UserController = require('../controllers/UserController')
const router = express.Router()
const checkAuth = require('../middleware/auth')


//contact
router.get('/contact',ContactController.display)
router.post('/create',ContactController.create)
router.get('/view/:id',ContactController.view)
router.put('/update/:id',ContactController.update)
router.delete('/delete/:id',ContactController.delete)


//teacher
router.get('/teacher',TeacherController.display)
router.post('/teachercreate',TeacherController.create)


//course
router.get('/course',CourseController.display)
router.post('/course/create',CourseController.create)
//router.get('/course/view/:id',courseController.view)
//router.put('/course/update/:id',courseController.update)
//router.delete('/course/delete/:id',courseController.delete)

// user
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/profile',checkAuth, UserController.profile)
router.get('/logout', UserController.logout)


module.exports = router

