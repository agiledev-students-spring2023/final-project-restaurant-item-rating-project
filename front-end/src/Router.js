import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import { Template } from './components/Template';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Template } from './components/Template';
import { DishReview } from './components/DishReview';
import { AddDish } from './components/AddDish';
import { AddRestaurant } from './components/AddRestaurant';
//import { DishDetail } from './components/DishDetail';
import { Search } from './components/Search';
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
            path="/dishreview"
            element={<DishReview />} 
          />

          {/* <Route 
            path="/dishdetail"
            element={<DishDetail/>} 
          /> */}
          <Route 
            path="/search"
            element={<Search />} 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { MyRoutes };