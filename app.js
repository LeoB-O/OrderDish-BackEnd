const Koa = require('koa');

var cors = require('koa2-cors');


const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    //testsetsetst
    await next();
});
app.use(cors({
    origin: function(ctx) {
        if (ctx.url === '/test') {
            return false;
        }
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// parse request body:
app.use(bodyParser());

// add controllers:
app.use(controller());


app.listen(3000);
console.log('app started at port 3000...');