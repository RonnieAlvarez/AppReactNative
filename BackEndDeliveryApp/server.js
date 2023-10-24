
import  express  from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import logger from 'morgan'
import session from 'express-session';
import keys from './config/keys.js';
//importar rutas
import userRoutes from './routes/userRoutes.js'
import passport from 'passport'
import passports from './config/passports.js'

dotenv.config()
const port = process.env.port || 3000
const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(
	session({
		secret: keys.secretOrKey,
		resave: true,
		saveUninitialized: true,
	})
);

app.use(passport.initialize())
app.use(passport.session())

app.disable('x-powered-by')
app.set('port', port)
passports(passport)
// LLamado de rutas
userRoutes(app)

app.listen(port,'192.168.100.40' || 'localhost', () => {
    console.log(`Server up on port: ${port}`)
})

app.on('error', (err) => {
    console.log(err)
})


app.get('/', (req, res) => {
  res.send('Ruta raiz del Backend')
})

app.get('/test', (req, res) => {
	res.send('Ruta test Backend');
});

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status||500).send(err.stack)
})