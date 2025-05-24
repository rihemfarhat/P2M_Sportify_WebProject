import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage';
import HomePage2 from './pages/homepage_postloguser';
import Signup from './pages/sign_up';
import Signup_coach from './pages/sign_up_coach';
import Login from './pages/login';
import Login_coach from './pages/login_coach';
import Subscription from './pages/PostLoginUser/subscription_postloguser';
import Nutrition from './pages/Nutrition';

import Nutrition2 from './pages/PostLoginUser/nutrition_postloguser';
import Profile from './pages/profile_user';
import NewsPage from './pages/news';
import NewsPage2 from './pages/PostLoginUser/news_postloguser';

import ProductList from './pages/PostLoginUser/ProductList_postloguser';
import EquipmentPage from './pages/EquipmentPage';
import EquipmentDetail from './pages/EquipmentDetail';
import WomenDetail from './pages/WomenDetail';
import AccessoiresDetail from './pages/AccessoriesDetail';
import MenDetail from './pages/MenDetail';
import MenPage from './pages/MenPage';
import AccessoriesPage from './pages/AccessoriesPage';
import CoachProfile from './pages/coach_form';
import ProductDetail from './pages/ProductDetail';
import TrainingPage2 from './pages/PostLoginUser/Trainingpage_postloguser';
import CoachDashboard from './pages/CoachDashboard';
import CartPage2 from './pages/PostLoginUser/CartPage_postloguser';


import PaymentPage from './pages/PaymentPage';
import OrderConfirmation from './pages/OrderConfirmation';
import WomenPage from "./pages/WomenPage";
import DietQuiz from "./pages/PostLoginUser/DietQuiz";
import DietPage from "./pages/PostLoginUser/DietPage";
import HealthyRecipes from './pages/HealthyRecipes';
import DietDetailsPage from  './pages/PostLoginUser/DietDetailsPage';
import NutritionistPage from './pages/PostLoginUser/NutritionistPage'
import BookConsultation from  './pages/BookConsultation'
import Workouts from './pages/Workouts'
import TrainingGoalsQuiz from './pages/TrainingGoalsQuiz'

import MuscleWorkouts from './pages/MuscleWorkouts';
import CardioWorkouts from './pages/CardioWorkouts';
import WeightLossWorkouts from './pages/WeightLossWorkouts';
import MobilityWorkouts from './pages/MobilityWorkouts';
import CoreWorkouts from './pages/CoreWorkouts';





import './App.css';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homepage_postloguser" element={<HomePage2 />} />
        <Route path="/sign_up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login_coach" element={<Login_coach />} />
        <Route path="/sign_up_coach" element={<Signup_coach />} />
        <Route path="/coach_form" element={<CoachProfile />} />
        <Route path="/CartPage_postloguser" element={<CartPage2 />} />
        <Route path="/TrainingGoalsQuiz" element={<TrainingGoalsQuiz  />} />

        <Route path="/CoachDashboard" element={<CoachDashboard  />} />
        <Route path="/OrderConfirmation" element={<OrderConfirmation />} />
        <Route path="/WomenPage" element={<WomenPage />} />
        <Route path="/subscription_postloguser" element={<Subscription />} />
        <Route path="/Nutrition" element={<Nutrition />} />

        <Route path="/nutrition_postloguser" element={<Nutrition2 />} />
        <Route path="/news" element={<NewsPage />} />

        <Route path="/profile_user" element={<Profile />} />
        <Route path="/news_postloguser" element={<NewsPage2 />} />
        <Route path="/ProductList" element={<ProductList />} />

        <Route path="/ProductList_postloguser" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/equipment/:id" element={<EquipmentDetail />} />
        <Route path="/men/:id" element={<MenDetail />} />
        <Route path="/women/:id" element={<WomenDetail />} />
        <Route path="/accessoires/:id" element={<AccessoiresDetail />} />
        <Route path="/equipment" element={<EquipmentPage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/Trainingpage_postloguser" element={<TrainingPage2 />} />
        <Route path="/PaymentPage" element={<PaymentPage />} />
        <Route path="/DietQuiz" element={<DietQuiz />} />
        <Route path="/diet" element={<DietPage />} />
        <Route path="/HealthyRecipes" element={<HealthyRecipes />} />
        <Route path="/diet/:dietId" element={<DietDetailsPage />} />
        <Route path="/NutritionistPage" element={<NutritionistPage />} />
        <Route path="/BookConsultation/:nutritionistId" element={<BookConsultation />} />
        <Route path="/Workouts" element={<Workouts />} />
        <Route path="/MuscleWorkouts" element={<MuscleWorkouts />} />
        <Route path="/CardioWorkouts" element={<CardioWorkouts />} />
        <Route path="/WeightLossWorkouts" element={<WeightLossWorkouts />} />
        <Route path="/MobilityWorkouts" element={<MobilityWorkouts />} />
        <Route path="/CoreWorkouts" element={<CoreWorkouts />} />

        

        



        

        

      </Routes>
    </div>
  );
}

export default App;
