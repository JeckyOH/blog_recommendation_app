const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path')

const index = require('./routes/index')
const users = require('./routes/users')
const articles = require('./routes/articles')

const mw = require('./middlewares')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(path.join(__dirname, '../../front-end/build')))

app.use(views(path.join(__dirname, '../../front-end/build'), {
  extension: 'html'
}))

app.use(mw.allowCrossOrigin());

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(articles.routes(), articles.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.start = function(port = 3000) {
    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`)
    })
}

module.exports = app
