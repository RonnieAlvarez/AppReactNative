import usersController from '../controllers/usersController.js'

const userRoutes = (app) => {
  app.post('/api/users/create',usersController.register)
  app.post('/api/users/login',usersController.login)
}

export default userRoutes