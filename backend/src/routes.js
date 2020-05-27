import express from 'express'
import TransactionController from './controllers/TransactionController'
import HashController from './controllers/HashController'


const routes = express.Router()

routes.post('/', TransactionController.register);
routes.post('/uploadFile', HashController.create);


module.exports = routes;