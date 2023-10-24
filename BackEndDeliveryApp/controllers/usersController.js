import {User}  from "../models/user.js";
import bcrypt  from 'bcryptjs';
import keys from "../config/keys.js";
import jwt  from "jsonwebtoken";


const usersController = {

  login(req, res) {
  
    const email = req.body.email
    const password = req.body.password
    User.findByEmail(email,async (err, myUser) => { 
			if (err) {
				return res.status(501).json({
					success: false,
					message: 'Hubo un error en el registro del usuario',
					error: err,
				});
      }
      if (!myUser) {
        return res.status(401).json({ // El cliente no tiene autorizacion para realizar esta peticion
					success: false,
					message: 'Email no encontrado',
				});
      }

      /* `const isPasswordValid = await bcrypt.compare(password, myUser.password)` is comparing the
      provided password with the hashed password stored in the database for the user. */
      const isPasswordValid = await bcrypt.compare(password, myUser.password)
      
      if (isPasswordValid) {
        const token = jwt.sign({ id: myUser.id, email: myUser.email }, keys.secretOrKey, {}) //{expiresIN}
        
        const data = {
          id: myUser.id,
          name: myUser.name,
          lastName: myUser.lastName,
          email: myUser.email,
          phone: myUser.phone,
          image: myUser.image,
          session_token: `JWT ${token}`
        }
        return res.status(201).json({
					success: true,
					message: 'El usuario fue autenticado',
					data: data, 
				});
      }
      else {
        return res.status(401).json({
					success: false,
					message: 'Password incorrecto',
				});

      }
		});

  },

  register(req, res) {
    
    const user = req.body;
    console.log(user)
    User.create(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: 'Hubo un error en el registro del usuario',
          error:err
        })
      }
      return res.status(201).json({
        success: true,
        message: 'El registro se realizo con exito',
        data:data // el ID del nuevo usuario que se registro
        
            })
    })
  }
}

export default usersController;