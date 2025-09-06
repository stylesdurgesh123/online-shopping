const express = require('express');
const auth = require('../Middlewares/auth');
const { addaddressController, getAddaddressController, deleteAddressController, getSingleAddressController, editAddressController} = require('../Controllers/addresh');
const addreshRouter = express.Router();

addreshRouter.post('/add',auth,addaddressController);
addreshRouter.get('/get',auth, getAddaddressController);
addreshRouter.get('/:id',auth, getSingleAddressController);
addreshRouter.delete('/:id',auth, deleteAddressController);
addreshRouter.put('/:id',auth, editAddressController);

module.exports = addreshRouter;