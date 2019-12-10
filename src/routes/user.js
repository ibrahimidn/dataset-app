const express = require('express')
const passport=require('passport')
const User = require('../models/user')
const router = new express.Router()

router.get('/login',(req,res)=>{
    res.render('pages/account/login')
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next)
    console.log(req.user)
  });

router.get('/register',(req,res)=>{
    res.render('pages/account/register')
})
router.post('/register',async (req,res)=>{
    const user = new User(req.body)
    console.log(user)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e.errmsg)
    }
})
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login')
})
module.exports = router