// // var chai = require('chai');
// // var expect = chai.expect;
// // var request = require('request');
// // const app = require('../app');
// // const axios = require('axios');


// // describe('ratingRouter', () => {
// //     describe('GET /dish/{dishId}/reviews', () => {
// //       it('failed to return an array of reviews', async () => {
// //         const res = await request(app).get('/dish/1/reviews');
// //         expect(res.statusCode).toEqual(404);
// //         expect(res.body).not.toBeInstanceOf(Array);
// //       });
// //     });

// //     describe('Post /dish/{dishID}/reviews', ()=> {
// //         it('failed to create a new review and return it',async()=>{
// //             const newReview = {
// //                 value: 5,
// //             };
// //             const res = await request(app)
// //             .post('/dish/1/reviews')
// //             .send(newReview);
// //             expect(res.statusCode).toEqual(401);
// //             expect(res.body).not.toMatchObject(newReview);
// //         });
// //     });

//     // describe('Put /dish/{dishId}/reviews/{reviewId}',()=>{
//     //     it('failed to update an exisiting review and return it',async()=>{
//     //         const updatedReview = {
//     //             value: 4,
//     //         };
//     //         const res = await request(app)
//     //         .put('/dish/1/reviews/1')
//     //         .send(updatedReview)
//     //         expect(res.statusCode).toEqual(404);
//     //         expect(res.body).not.toMatchObject(updatedReview);
//     //     }); 
//     // });

//     // describe('DELETE /dish/{dishId}/reviews/{reviewId}',()=>{
//     //     it('failed to delete an existing review',async()=>{
//     //         const res = await request(app).delete('/dish/1/reviws/1');
//     //         expect(res.statusCode).toEqual(404);
//     //     });
//     // });
// // });


// var chai = require('chai');
// var expect = chai.expect;
// const app = require('../app');
// const axios = require('axios');

// describe('ratingRouter', () => {
//   describe('GET /dish/{dishId}/reviews', () => {
//     it('failed to return an array of reviews', async () => {
//       const res = await axios.get('http://localhost:3000/restaurant/dish/1/review');
//       expect(res.status).toEqual(404);
//       expect(res.data).not.toBeInstanceOf(Array);
//     });
//   });

//   describe('Post /dish/{dishID}/reviews', () => {
//     it('failed to create a new review and return it', async () => {
//       const newReview = {
//         value: 5,
//       };
//       const res = await axios.post('http://localhost:3000/restaurant/dish/1/review', newReview);
//       expect(res.status).toEqual(401);
//       expect(res.data).not.toMatchObject(newReview);
//     });
//   });
// });