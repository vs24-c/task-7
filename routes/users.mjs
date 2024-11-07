import { Router } from "express";
import UserController from "../controller/userController.mjs";
import UserValidate from "../validate/userValidate.mjs";


const router = Router();
router.get('/', UserController.getListUsers);

router.get('/reg/:id?', UserController.getAddUserForm)

router.post('/reg/:id?', 
UserValidate.validateUser,
UserController.addUser)

router.delete('/:id', UserController.deleteUser)

export default router;
