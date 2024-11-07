import UserService from "../models/userService.mjs";
import { validationResult } from "express-validator";

class UserController {

  static async getListUsers(req, res) {    
    try {
      const users = await UserService.getList();
      return res.render('usersList', {
        users: users
      })
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getAddUserForm(req, res) {     
    try {
      const id = req.params.id
      let user = null
      if (id) {
        user = await UserService.getById(id)
      }
      res.render('addUserForm', {
        errors: [],
        users: user
      });
    } catch (error) {
      console.log(error.message);
      
       res.status(500).json({error: error.message});
    }
  }

  static async addUser(req, res) { 
   
    const errors = validationResult(req);  
    const users = req.body 
    console.log(users);
    
    
    if (!errors.isEmpty()) {
      if (req.params.id) users.id = req.params.id;
      return res.render('addUserForm', {
        errors: errors.array(),
        users,
      });
    }

    try {
      const { name, surname, email, age } = users   
      if (req.params.id) {
       await UserService.updateUser(req.params.id, { name, surname, email, age });        
      } else {
       await UserService.create({name, surname, email, age});
      }   
   return res.redirect('/')  
      
    } catch (error) {
      res.status(500).render('addUserForm', {
        errors: [{msg: errors.message}],
        users,
      });
    }
  }

  static async deleteUser(req, res) {    
  try {
    const id = req.params.id    
    const delRes = await UserService.deleteUs(id)    
    res.render('usersLisr', {
      users: delRes
    })
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

}

export default UserController;