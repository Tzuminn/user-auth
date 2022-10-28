const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')

const app = express()
const port = 3000

const routes = require('./routes')
require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))

//middleware，需要把它寫在路由之前
app.use(session({
  secret: 'mySecret',   // 用來認證該 Session 的資料。（必填）
  name: 'user',  //儲存 sessionID 的那個 Cookie 的名稱，預設是connect.sid。
  saveUninitialized: false, //強制將未初始化的session存回 session store，未初始化的意思是它是新的而且未被修改。
  resave: true, //即使 Session 沒做變動，是否強制重新儲存進 Store，預設是 true。
}))

app.use(routes)

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)
})