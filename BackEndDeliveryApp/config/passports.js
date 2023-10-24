import { Strategy as jwtstrategy,ExtractJwt } from 'passport-jwt';
import keys from './keys.js';
import { User } from '../models/user.js';

const passports = (passport)=> {
  let opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
  opts.secretOrKey = keys.secretOrKey

  passport.use(new jwtstrategy(opts, (jwt_payload, done)=> {
  User.findById(jwt_payload.id, (err, user) => {
    if (err) {
        return done(err,false)
    }
    if (user) {
      return done(null, user)
    } else {
      return done(null,false)
    }
    })
  }))
}

export default passports