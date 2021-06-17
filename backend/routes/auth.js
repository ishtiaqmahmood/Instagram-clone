const { Router } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys.js');
const requireLogin = require('../middleware/requireLogin.js');

const router = express.Router();

const User = mongoose.model("User");

// router.get('/protected', requireLogin, (req,res) => {
//     res.send("hello user")
// })

router.post('/signup', (req,res) => {
    const {name, email, password, pic} = req.body;
    if (!email || !password || !name) {
        return res.status(422).json({error: "Please add all the fields"});
    }
    User.findOne({email:email})
    .then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({error:"user already exists with that email"})
        }
        bcrypt.hash(password, 12)
        .then(hashedpassword=> {
            const user = new User({
                email,
                password:hashedpassword,
                name,
                pic
            })
            user.save()
            .then(user => {
                res.json({message: "saved successfully"});
            })
            .catch(err => {
                console.log(err)
            })
        })
        

    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/signin', (req,res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email: email})
    .then(savedUser => {
        if (!savedUser) {
            return res.status(422).json({error:"Invalid Email or Password"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if(doMatch) {
                // res.json({message: "successfully signed in"})
                const token = jwt.sign({_id:savedUser}, JWT_SECRET);
                const {_id, name, email,followers, following,pic} = savedUser
                res.json({token, user:{_id, name, email, followers, following,pic}});
            }
            else {
                return res.status(422).json({error: "Invalid Email or Password"})
            }
        })
        .catch(err => {
            console.log(err)
        })
    })

})

module.exports = router;