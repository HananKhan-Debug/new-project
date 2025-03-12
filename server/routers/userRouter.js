const express = require("express");
const router = express.Router();
const userContoler = require("../controllers/userContolerr");



// GET user by ID with role
router.get("/users", userContoler.getUsers);
router.post('/', userContoler.Usercreate);
router.get("/:id", userContoler.SingleUser);
router.put('/:id', userContoler.UpdateUsers);
router.delete('/:id', userContoler.Deleteuser);
module.exports= router