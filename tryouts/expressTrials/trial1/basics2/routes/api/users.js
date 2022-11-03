const Express = require('express');
const ROLES_LIST = require('../../config/roles_list');
const verifyJWT = require('../../middleware/verifyJWT');
const verifyRoles = require('../../middleware/verifyRoles');
const router = Express.Router();
const User = require('../../model/User');

router.use(verifyJWT);

router.get("/", verifyRoles(ROLES_LIST.Admin), async(req, res)=>{
    try {
        const users = await User.find({}, 'username').exec()
        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Internal error happened"});
    }
})

module.exports = router;