
const path = require('path');
const html = require('fastify-static');
const multipart = require('fastify-multipart')
const fastify = require('fastify')({ logger: {level: 'trace'} });
const utilities = require('./utils');


const appMappings = process.env.APPMAPPING ? process.env.APPMAPPING : utilities.sampleAppMappings;


fastify.register(html, {
    root: path.join(path.resolve(), 'public')
});
fastify.register(multipart,{addToBody: true});

fastify.get('/', function (req, reply) {
    reply.sendFile('index.html') 
});
fastify.post('/', function (req, reply) {
    const routeRequest = {
        org: req.body.org,
        app : req.body.app
    };
    fastify.log.info(routeRequest);
    const redirect = utilities.getRoute(routeRequest,appMappings);
    
    if(redirect){
        fastify.log.info(`redirect to ${redirect.route}`);
        reply.headers(routeRequest).redirect(redirect.route);
    } else{
        reply.code(422).send()
    }
   
});

const start = async () => {
    try {
        await fastify.listen(3000,'0.0.0.0')
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()

