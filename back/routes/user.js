//Imports
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Middleware => Bruteforce
const protect = require('../middleware/bruteforce');



//Routage
router.post("/signup", userCtrl.signup);
router.post("/login", protect, userCtrl.login);
router.get('/me', auth, userCtrl.userProfil);
router.put('/update',auth, userCtrl.changePwd);
router.delete('/delete', auth, userCtrl.deleteProfile)
router.put('/avatar', auth, multer, userCtrl.userCreatAvatar);
router.get('/FicheUser', auth, userCtrl.FicheUser);

//route pour l'administrateur
router.delete('/admin/delete', auth, userCtrl.deleteUser)
router.delete('/admin/deleteAvatar', auth, userCtrl.deleteAvatar)



module.exports = router;