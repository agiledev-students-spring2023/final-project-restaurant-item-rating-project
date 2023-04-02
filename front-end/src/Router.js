import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Template } from './components/Template';
import { DishReview } from './components/DishReview';
import { AddDish } from './components/AddDish';
import { AddRestaurant } from './components/AddRestaurant';
import { DishDetail } from './components/DishDetail';
import { Search } from './components/Search';
import { RestaurantProfile} from './components/RestaurantProfile';

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> 
          <Route 
            path="/template"
            element={<Template />} 
          /> 
          <Route 
            path="/add/dish"
            element={<AddDish />} 
          />
          <Route 
            path="/add/restaurant"
            element={<AddRestaurant />} 
          />
          <Route 
            path="/review"
            element={<DishReview />} 
          />
          <Route 
            path="/dish"
            element={<DishDetail />} 
          />
          <Route 
            path="/search"
            element={<Search />} 
          />
          <Route 
            path="/profile"
            element={<RestaurantProfile />} 
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