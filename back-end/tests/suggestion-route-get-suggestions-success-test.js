var chai = require('chai');
var expect = chai.expect;
const axios = require('axios');

describe('GET suggestion/{cityid}/restaurant', ()=>{
    it('responds with JSON containing the restaurant suggestions', (done) => {
      axios.get('http://localhost:3000/suggestion/123/restaurant')
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).should.be.a('object');
        expect(res.data).should.have.property('name');
        expect(res.data).should.have.property('location');
        expect(res.data).should.have.property('dishes');
        expect(res.data).should.have.property('id');
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
      expect(res.body).should.be.a('object');
      expect(res.data).should.have.property('name');
      expect(res.data).should.have.property('description');
      done();
})
  .catch(done);
});
});
