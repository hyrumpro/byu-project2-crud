const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');

dotenv.config();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Item Management API',
            version: '1.0.0',
            description: 'API documentation for the Item management system',
        },
        servers: [
            {
                url: process.env.BASE_URL || 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'connect.sid',
                },
            },
            schemas: {
                Item: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Unique identifier for the item',
                        },
                        name: {
                            type: 'string',
                            description: 'Name of the item',
                        },
                        description: {
                            type: 'string',
                            description: 'Description of the item',
                        },
                        price: {
                            type: 'number',
                            description: 'Price of the item',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update timestamp',
                        },
                    },
                },
                ItemInput: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Name of the item',
                        },
                        description: {
                            type: 'string',
                            description: 'Description of the item',
                        },
                        price: {
                            type: 'number',
                            description: 'Price of the item',
                        },
                    },
                    required: ['name', 'price'],
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                        },
                        error: {
                            oneOf: [
                                { type: 'string' },
                                {
                                    type: 'array',
                                    items: { type: 'string' },
                                },
                            ],
                        },
                    },
                },
            },
        },
        security: [
            {
                cookieAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js', './models/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
