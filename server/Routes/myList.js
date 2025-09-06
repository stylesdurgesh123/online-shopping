const express = require('express');
const auth = require('../Middlewares/auth');
const { addTomyListController, deleteTomyListController, getMyListController } = require('../Controllers/myList');
const myListRouter = express.Router();

myListRouter.post('/add',auth,addTomyListController);
myListRouter.delete('/:id',auth,deleteTomyListController);
myListRouter.get('/',auth,getMyListController);

module.exports= myListRouter;