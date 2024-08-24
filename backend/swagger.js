const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-BookingHealthcare API - Swagger',
            description: "E-BookingHealthcare API with Node.js, Express and MongoDB",
            contact: {
                name: "Nguyen Chinh",
                email: "chinhnguyennn24@gmail.com",
                url: "https://github.com/ngchinhdev/",
            },

            version: '1.0.0',
        },
        servers: [
            {
                url: process.env.SERVER_LOCAL_URL,
                description: "Local server"
            },
            {
                url: process.env.SERVER_LIVE_URL,
                description: "Live server"
            },
        ],
        components: {
            responses: {
                200: {
                    description: 'Success',
                    contents: 'application/json'
                },
                201: {
                    description: 'Created',
                    contents: 'application/json'
                },
                400: {
                    description: 'Bad request. Invalid input data.',
                    contents: 'application/json'
                },
                401: {
                    description: 'Unauthorized. Access denied.',
                    contents: 'application/json'
                },
                403: {
                    description: 'Forbidden. Access denied.',
                    contents: 'application/json'
                },
                404: {
                    description: 'Not found. The requested resource is not found.',
                    contents: 'application/json'
                },
                409: {
                    description: 'Conflict. Some data already exists.',
                    contents: 'application/json'
                },
                500: {
                    description: 'Server error. An unexpected error occurred.',
                    contents: 'application/json'
                }
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app, port) => {
    app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
};

module.exports = swaggerDocs;