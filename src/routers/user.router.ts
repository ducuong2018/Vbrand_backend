const { Router } = require('express');
const router = Router();
import {getUser} from "../controllers/user.controller";
import {registerUser} from "../controllers/user.controller";
router.get('/users', getUser);
router.post('/register', registerUser);
module.exports = router;
