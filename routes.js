// /api/items   GET

// /api/items/{id}   GET

// /api/items   POST

// /api/items/{id}  PUT

const Joi = require('joi');
const Boom = require('boom');
const Item = require('./model');

const itemszzz = [
    {
        _id: 1,
        name: "Item 1",
    },
    {
        _id: 2,
        name: "Item 2",
    }, {
        _id: 3,
        name: "Item 3",
    }
]


module.exports = [
    {
        method: 'GET',
        path: '/api/items',
        config: {
            handler: function (request, reply) {

                Item.find({})
                    .exec(function (err, items) {
                        if (err) {
                            return reply(Boom.badRequest(err));
                        }
                        console.log('Items!!!!')
                        reply(items);
                    });
            }
        }
    },
    {
        method: 'GET',
        path: '/api/items/{id}',
        config: {
            validate: {
                params: {
                    id: Joi.string()
                }
            },
            handler: function (request, reply) {
                Item.findById(request.params.id)
                    .exec(function (err, foundItem) {
                        if (err) {
                            return reply(Boom.badRequest(err));
                        }

                        if (!foundItem) {
                            return reply(Boom.notFound('Item not found!'));
                        }

                        reply(foundItem);
                    })
            }
        }
    },
    {
        method: 'POST',
        path: '/api/items',
        config: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().required(),
                    price: Joi.number().precision(2).required(),
                    description: Joi.string().required(),
                    stock: Joi.number().integer().required()
                })
            },
            handler: function (request, reply) {
                let newItem = new Item(request.payload);

                newItem.save(function (err, savedItem) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }

                    reply(savedItem).code(201);
                });

            }
        }
    },
    {
        method: 'PUT',
        path: '/api/items/{id}',
        config: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().required(),
                    price: Joi.number().precision(2).required(),
                    description: Joi.string().required(),
                    stock: Joi.number().integer().required()
                }),
                params: {
                    id: Joi.string()
                }
            },
            handler: function (request, reply) {
                Item.findById(request.params.id)
                    .exec(function (err, foundItem) {
                        if (err) {
                            return reply(Boom.badRequest(err));
                        }

                        if (!foundItem) {
                            return reply(Boom.notFound('Item not found!'));
                        }
                        let payload = request.payload;

                        foundItem.name = payload.name;
                        foundItem.price = payload.price;
                        foundItem.description = payload.description;
                        foundItem.stock = payload.stock;
                        foundItem.dateModified = Date.now();

                        foundItem.save(function (err, savedItem) {
                            if (err) {
                                return reply(Boom.badRequest(err));
                            }

                            reply({
                                statusCode: 200,
                                message: 'Item upated'
                            });
                        });
                    })
            }
        }
    }
]