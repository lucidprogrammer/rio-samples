const express = require('express');
const spdy = require('spdy');
const app = express();
app.use(express.json());

const msleep = (n) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
const sleep = (n) => msleep(n * 1000);

const port = process.env.PORT ? process.env.PORT : 3000;



app.get('*', (req, res) => {
    if (process.env.SLEEP) {
        sleep(process.env.SLEEP); //mimic an intensive operation to showcase autoscaling
    }
    const application = req.path.replace('/', '');
    const message = `
    Welcome to ${application ? application : 'sample'} app
    Revision is ${process.env.REVISION ? process.env.REVISION : "unknown"} 
    Namespace is ${process.env.NAMESPACE ? process.env.NAMESPACE : "unknown"}
    `;
    return res.send(`${message}`);
});

app.post('*', (req, res) => {
    if (req.body.sleep) {
        sleep(req.body.sleep);
    }
    res.send({
        status: 200
    });
})

spdy.createServer({
    spdy: {
        protocols: ['h2'],
        ssl: false,
        plain: true,
        'x-forwarded-for': true,
    }
}, app).listen(port, '0.0.0.0', () => console.log(`
Example app listening on port ${port}! 
Revision is ${process.env.REVISION ? process.env.REVISION : "unknown"} 
Namespace is ${process.env.NAMESPACE ? process.env.NAMESPACE : "unknown"}
`))