const express = require('express')
const session = require('express-session')
const router = express.Router()
const Authentication = require('../../models/authentication')

router.get('/', (req, res) => {
  res.render('login')
})

router.post('/', (req, res) => {
  const { email, password } = req.body
  Authentication.findOne({ email: email })
    .then(user => {
      if (user.password === password) {
        req.session.user = user.firstName
        return res.render('index', { name: user.firstName })
      } else {
        const fail = '信箱或密碼錯誤，請重新輸入!'
        return res.render('login', { email, fail })
      }
    })
    .catch(error => {
      console.error(error)
      const fail = '信箱或密碼錯誤，請重新輸入!'
      return res.render('login', { email, fail })
    })
})

module.exports = router