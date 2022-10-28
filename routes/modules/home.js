const express = require('express')
const router = express.Router()
const Authentication = require('../../models/authentication')

router.get('/', (req, res) => {
  const name = req.session.user
  if (name) {
    return res.render('index', { name })
  }
  return res.redirect('/login')
})

// 匯出路由模組
module.exports = router
