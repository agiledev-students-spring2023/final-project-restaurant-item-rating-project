var chai = require('chai');
var expect = chai.expect;
const axios = require('axios');

describe('GET suggestion/{cityid}/restaurant', ()=>{
    it('failed to respond with JSON containing the restaurant suggestions', (done) => {
      axios.get('http://localhost:3000/suggestion/123/restaurant')
      .then((res) => {
        expect(res.status).to.equal(404);
        expect(res.body).should.have.property('object');
        expect(res.body).should.have.property('message').eq("Can not retrieve information regarding restaurant suggestion under the given path.");
        done();
      })
      .catch(done);
    })
})
describe('GET suggestion/{cityid}/{restaurantid}/dish', ()=>{
    it('failed to respond with JSON containing the dish suggestions', (done) => {
    axios.get('http://localhost:3000/suggestion/123/456/dish')
    .then((res) => {
      expect(res.status).to.equal(404);
      expect(res.body).should.have.property('object');
      expect(res.body).should.have.property('message').eq("Can not retrieve information regarding dish suggestion under the given path.");
      done();
})
  .catch(done);
});
});
