const router = require('express').Router()
const passport = require('passport')


router.get('/login' ,(req,res) => {
    res.render('login')
})
router.get('/logout' ,(req,res) => {
    res.logout();
    res.redirect('/auth/login')
})



router.get('/google' ,
            passport.authenticate('google',{
            scope:['profile','email'],
}),(req,res) => {
    res.send('login with google')
})

router.get('/auth/google/callback',passport.authenticate('google')
, (req,res) => {
    res.send(req.user)
});


module.exports = router