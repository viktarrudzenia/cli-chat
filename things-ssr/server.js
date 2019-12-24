require('dotenv').config();

const cacheableResponse = require('cacheable-response')
const express = require('express')
const asyncHandler = require('express-async-handler')
const next = require('next')
const mongoose = require('mongoose');

const {
    getAll,
    createThing,
    updateThing,
    deleteThing,
    getThingById,
} = require('../services/thing');

const {
    validateParam,
} = require('../utils/validator');

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

    server.get('/about', (req, res) => {
        const pagePath = '/about';
        return ssrCache({ req, res, pagePath })
    })

    server.get('/about/:word', (req, res) => {
        const queryParams = { word: req.params.word };
        const pagePath = '/about';
        return ssrCache({ req, res, pagePath, queryParams })
    })

    server.get('/things', asyncHandler(async (req, res) => {
        const pagePath = '/things';
        const queryParams = await getAll();

        return ssrCache({ req, res, pagePath, queryParams })
    }))

    server.get('/things:id', asyncHandler(async (req, res) => {
        const pagePath = '/things:id';
        const { id } = req.params;
        const queryParams = await getThingById(id);

        return ssrCache({ req, res, pagePath, queryParams })
    }))

    server.post('/things', asyncHandler(async (req, res) => {
        const { title, body } = req.body;
        const pagePath = '/things';

        if (!title || !body) {
            return ssrCache({ req, res, pagePath });
        }

        const queryParams = await createThing({ title, body });

        return ssrCache({ req, res, pagePath, queryParams });
    }));

    server.put('/things/:id', validateIdParam, asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { title, body } = req.body;
        const pagePath = '/things/:id';

        if (!title && !body) {
            return ssrCache({ req, res, pagePath });
        }

        const queryParams = await updateThing({ id, title, body });

        return ssrCache({ req, res, pagePath, queryParams });
    }));

    server.patch('/things/:id', validateIdParam, asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { title, body } = req.body;
        const pagePath = '/things/:id';

        if (!title && !body) {
            return ssrCache({ req, res, pagePath });
        }

        const queryParams = await updateThing({ id, title, body });

        return ssrCache({ req, res, pagePath, queryParams });
    }));

    server.delete('/:id', validateIdParam, asyncHandler(async (req, res) => {
        const { id } = req.params;
        const pagePath = '/things/:id';

        const queryParams = await deleteThing(id);

        return ssrCache({ req, res, pagePath, queryParams });
    }));

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
