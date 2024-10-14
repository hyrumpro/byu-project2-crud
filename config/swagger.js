// config/swagger.js
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
                    name: 'connect.sid', // Default cookie name for express-session
                },
            },
            schemas: {
                Item: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Unique identifier for the item',
                            example: '60d0fe4f5311236168a109ca',
                        },
                        name: {
                            type: 'string',
                            description: 'Name of the item',
                            example: 'Sample Item',
                        },
                        description: {
                            type: 'string',
                            description: 'Description of the item',
                            example: 'This is a sample item.',
                        },
                        quantity: {
                            type: 'number',
                            description: 'Quantity of the item',
                            example: 10,
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp',
                            example: '2023-10-14T12:34:56.789Z',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update timestamp',
                            example: '2023-10-14T12:34:56.789Z',
                        },
                    },
                },
                ItemInput: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Name of the item',
                            example: 'New Item',
                        },
                        description: {
                            type: 'string',
                            description: 'Description of the item',
                            example: 'Description of the new item.',
                        },
                        quantity: {
                            type: 'number',
                            description: 'Quantity of the item',
                            example: 5,
                        },
                    },
                    required: ['name', 'description', 'quantity'],
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
                            description: 'Error message or list of error messages',
                        },
                    },
                },
            },
            responses: {
                Unauthorized: {
                    description: 'Authentication information is missing or invalid',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse',
                            },
                            example: {
                                success: false,
                                error: 'Authentication required',
                            },
                        },
                    },
                },
                BadRequest: {
                    description: 'Bad request due to invalid input',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse',
                            },
                            example: {
                                success: false,
                                error: ['Name is required', 'Quantity must be a non-negative integer'],
                            },
                        },
                    },
                },
                NotFound: {
                    description: 'Resource not found',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse',
                            },
                            example: {
                                success: false,
                                error: 'Resource not found',
                            },
                        },
                    },
                },
                InternalServerError: {
                    description: 'Internal server error',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse',
                            },
                            example: {
                                success: false,
                                error: 'Internal Server Error',
                            },
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
