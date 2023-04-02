const request = require('supertest');
const app = require('./app');

describe('ratingRouter', () => {
    describe('GET /dish/:dishId/reviews', () => {
      it('should return an array of reviews', async () => {
        const res = await request(app).get('/dish/1/reviews');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
      });
    });

    describe('Post /dish/:dishID/reviews', ()=> {
        it('should create a new review and return it',async()=>{
            const newReview = {
                value: 5,
            };
            const res = await request(app)
            .post('/dish/1/reviews')
            .send(newReview);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toMatchObject(newReview);
        });
    });

    describe('Put /dish/:dishId/reviews/:reviewId',()=>{
        it('should update an exisiting review and return it',async()=>{
            const updatedReview = {
                value: 4,
            };
            const res = await request(app)
            .put('/dish/1/reviews/1')
            .send(updatedReview)
            expect(res.statusCode).toEqual(200);
            expect(res.body).toMatchObject(updatedReview);
        }); 
    });

    describe('DELETE /dish/:dishId/reviews/:reviewId',()=>{
        it('should delete an existing review',async()=>{
            const res = await request(app).delete('/dish/1/reviws/1');
            expect(res.statusCode).toEqual(204);
        });
    });
});
