const router = require('express').Router();
const userController = require('../controllers/userController');

const userRouter = () => {
    router.route('/')
    .get(userController.findAll)
    .post(userController.create)

    router.route('/:cpf')
    .get(userController.findOne)
    .put(userController.update)
    .delete(userController.remove)

    return router
};

module.exports = userRouter;