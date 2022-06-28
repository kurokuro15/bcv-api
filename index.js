// Dotenv to eviroment variables
import 'https://deno.land/x/dotenv@v3.2.0/load.ts'
// oak middleware server
import { Application, Router } from 'https://deno.land/x/oak@v10.6.0/mod.ts'
// // supabase is a database as a service?
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Export Eviroment variables from .env file :D
const { SUPABASE_URL, CLIENT_KEY } = Deno.env.toObject()

// create supabase client
const supabase = createClient(SUPABASE_URL, CLIENT_KEY)

// declare get function
async function getData(currency) {
  const { data, error } = await supabase
    .rpc('get_last_bolivar_exchange', {
      curr: currency || 'any'
    })
    .select('*')

  if (error) throw error
  else return data
}

// declare handler function
async function handler(ctx) {
  const { curr } = ctx?.params
  try {
    ctx.response.body = await getData(curr)
  } catch (error) {
    ctx.response.body = { error }
  }
}

// create server
const app = new Application()

// declare router object
const router = new Router()

// declare root route
router.get('/', ctx => {
  ctx.response.body = `Hola mundo! desde mi servidor deno`
})
// declare route to get bolivar exchanges from supabase
router.get('/v1/exchange', async ctx => {
  await handler(ctx)
})

router.get('/v1/exchange/:curr', async ctx => {
  await handler(ctx)
})
// use all routes
app.use(router.routes())
app.use(router.allowedMethods())

app.listen({ port: 3000 }).then(() => console.log('Listening on port 3000'))
