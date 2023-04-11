const { faker } = require("@faker-js/faker");
const sinon = require("sinon");

function makeReview() {
  return {
      _id: faker.random.alphaNumeric(10),
      value: faker.random.numeric(1),
      date: faker.date.recent(),
      userID: faker.random.numeric(1),
      validate: sinon.stub().resolves(1),
      save: sinon.stub().resolves(1),
  }
}

function makeDish() {
  const id = faker.random.alphaNumeric(10);
  return {
      _id: id,
      name: faker.lorem.word(),
      reviews: Array.from({length:5}, makeReview),
      validate: sinon.stub().resolves(1),
      save: sinon.stub().resolves(1),
  }
}

function makeRestaurant() {
  const dishes = Array.from({length:5}, makeDish);

  const dishIdMethodStub = sinon.stub();
  const getDish = function (id) {
    return dishes.find( (dish) => {
      if (id===dish.id) {return dish;}
    })
  }
  return ({
    _id: faker.random.alphaNumeric(10), //Maybe comment this out
    name: faker.lorem.word(),
    dishes: {
        data: dishes,
        id: dishIdMethodStub.returns(
          getDish(dishIdMethodStub.args[0])
        ),
    },
    location: faker.lorem.word(),
    validate: sinon.stub().resolves(1),
    save: sinon.stub().resolves(1),
  });
}

function makeRestaurantArray(quantity) {
  return Array.from({length:quantity}, makeRestaurant);
}

module.exports = {
  makeRestaurantArray,
  makeReview,
  makeDish,
  makeRestaurant,
}