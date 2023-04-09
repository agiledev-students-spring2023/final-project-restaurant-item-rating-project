import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { DishReview } from './components/DishReview';
import { AddDish } from './components/AddDish';
import { AddRestaurant } from './components/AddRestaurant';
import { DishDetail } from './components/DishDetail';
import { Search } from './components/Search';
import { About } from './components/About';
import { RestaurantDetail } from './components/RestaurantDetail';

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> 
          <Route 
            path="restaurant/:restaurantID/dish"
            element={<AddDish />} 
          />
          <Route
            path="restaurant/:restaurantID/dish/:dishID/rating"
            element={<DishReview />} 
          />
          <Route 
            path="/restaurant/:restaurantID/dish/:dishID"
            element={<DishDetail />} 
          />
           <Route 
            path="/restaurant/:restaurantID"
            element={<RestaurantDetail />} 
          />
          <Route 
            path="/restaurant"
            element={<AddRestaurant />} 
          />
          <Route 
            path="/search"
            element={<Search />} 
          />
          <Route 
            path="/about"
            element={<About />} 
          />
          {/* catch all */}
          <Route 
            path="/*"
            element={<Home />} 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { MyRoutes };