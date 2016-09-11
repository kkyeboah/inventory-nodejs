const faker = require('faker');
const Item = require('./model');

module.exports = function () {
    for(var i = 0; i < 10; i++) {
        let newItem = new Item({
            "name": faker.commerce.productName(),
            "price": faker.commerce.price(),
            "description": faker.lorem.sentence(),
            "stock": faker.random.number()
        });
        newItem.save();
    }
}