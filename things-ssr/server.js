require('dotenv').config();

const cacheableResponse = require('cacheable-response')
const express = require('express')
const next = require('next')
const mongoose = require('mongoose');

const port = parseInt(process.env.PORT, 10) || 3002
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()

const ssrCache = cacheableResponse({
    ttl: 1000 * 60 * 60, // 1hour
    get: async ({ req, res, pagePath, queryParams }) => ({
        data: await app.renderToHTML(req, res, pagePath, queryParams),
    }),
    send: ({ data, res }) => res.send(data),
})

app.prepare().then(() => {
    const server = express()

    server.get('/', (req, res) => ssrCache({ req, res, pagePath: '/' }))

    server.get('/main', (req, res) => ssrCache({ req, res, pagePath: '/' }))

    server.get('/about/:word', (req, res) => {
        const queryParams = { word: req.params.word };
        const pagePath = '/about';
        return ssrCache({ req, res, pagePath, queryParams })
    })

    server.get('/about', (req, res) => {
        const pagePath = '/about';
        return ssrCache({ req, res, pagePath })
    })

    server.get('*', (req, res) => handle(req, res))

    server.listen(port, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })

    mongoose.connect(process.env.MONGO_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
})
