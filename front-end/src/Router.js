import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import { Template } from './components/Template';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { DishReview } from './components/DishReview';
function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> 
          {/* <Route 
            path="/template"
            element={<Template />} 
          />  */}
          <Route 
            path="/dishreview"
            element={<DishReview />} 
          /> 

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { MyRoutes };