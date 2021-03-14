import { Application, Router } from 'https://deno.land/x/oak/mod.ts'
import { renderFileToString } from 'https://deno.land/x/dejs@0.9.3/mod.ts';
import makeloc from 'https://x.nest.land/dirname@v1.1.2/mod.ts'

import { ensureAuthenticated } from './middleware/authmiddleware.ts';
import users from './controllers/usercontroller.ts';
import auth from './controllers/authcontroller.ts';

import { getHome } from './router/home/methods/getHome.ts'

Deno.stdout.write(new TextEncoder().encode(
    `
  _                _____                               
 | |              / ____|                              
 | |      __ _   | (___    ___   _   _  _ __  ___  ___ 
 | |     / _\` |   \\___ \\  / _ \\ | | | || '__|/ __|/ _ \\
 | |____| (_| |   ____) || (_) || |_| || |  | (__|  __/
 |______|\\__,_|  |_____/  \\___/  \\__,_||_|   \\___|\\___|
`
)).then()
Deno.stdout.write(new TextEncoder().encode('Powered with love by Goumies')).then()
Deno.stdout.write(new TextEncoder().encode('\n\n\n')).then()

const ENV = Deno.env.toObject()
const PORT = ENV.PORT || 4000
const HOST = ENV.HOST || '127.0.0.1'

const ROUTER = new Router()
const APP = new Application()

const { __DIRNAME, __FILENAME } = makeloc(import.meta.url)

// render html... https://medium.com/recoding/rendering-html-css-in-deno-using-view-engine-e07469613598
APP.use(ROUTER.routes())
APP.use(ROUTER.allowedMethods())

ROUTER
    .get('/', getHome)

console.log(`Listening on port ${PORT}...`)
Deno.stdout.write(new TextEncoder().encode(`Host: ${HOST}`)).then()

await APP.listen(`${HOST}:${PORT}`)

Deno.exit(0);