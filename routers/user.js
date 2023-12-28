import express from "express";
import {createUser,exituser,getallUser,authUser} from '../controller/UserController.js';
import getAuth from "../middleware/auth.js";

const router = express.Router();

router.post('/register',createUser);
router.get('/',getallUser);
router.post('/login',exituser);
router.get('/auth',getAuth,authUser);

export default router;