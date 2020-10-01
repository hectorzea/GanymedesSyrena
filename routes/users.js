const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../model/user');

/* GET users listing. */
router.post('/login', function (req, res, next) {
    let body = req.body;
    let oFindCriteria = {
        email: body.email
    };
    User.findOne(oFindCriteria, (err, user) => {
        if (err) return res.status(400).json({ok: false, err});
        if (!user || !bcrypt.compareSync(body.password, user.password)) {
            return res.status(400).json({
                ok: false,
                err: "User or password is incorrect. =( "
            });
        }
        res.json({
            ok: true,
            user,
        });
    });
});

/**
 * Creating the user.
 */
router.post('/', function (req, res, next) {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
    });
    user.save((err, userDB) => {
        if (err) return res.status(400).json({ok: false, err});
        res.json({
            ok: true,
            userDB
        });
    });
});

module.exports = router;
