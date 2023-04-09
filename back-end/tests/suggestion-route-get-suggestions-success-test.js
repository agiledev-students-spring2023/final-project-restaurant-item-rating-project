var chai = require('chai');
var expect = chai.expect;
const axios = require('axios');

describe('GET suggestion/{cityid}/restaurant', ()=>{
    it('responds with JSON containing the restaurant suggestions', (done) => {
      axios.get('http://localhost:3000/suggestion/123/restaurant')
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.data).to.have.property('name');
        expect(res.data).to.have.property('location');
        expect(res.data).to.have.property('dishes');
        expect(res.data).to.have.property('id');
        done();
      })
      .catch(done);
    })
})
describe('GET suggestion/{cityid}/{restaurantid}/dish', ()=>{
    it('responds with JSON containing the dish suggestions', (done) => {
    axios.get('http://localhost:3000/suggestion/123/456/dish')
    .then((res) => {
      expect(res.status).to.equal(200);
      expect(res.data).to.have.property('name');
      expect(res.data).to.have.property('description');
      done();
})
  .catch(done);
});
});
