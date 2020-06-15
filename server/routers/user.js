const Router = require('koa-router')

const userRouter = new Router({
  prefix: '/user'
})

userRouter.post('/login', async (ctx) => {
  const user = ctx.request.body
  if (user.username === 'cyc' && user.password === '123456') {
    ctx.session.user = {
      username: 'cyc'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'cyc'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password invalid!'
    }
  }
})

module.exports = userRouter
