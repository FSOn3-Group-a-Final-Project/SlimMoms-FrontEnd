import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import PrivateRoute from '../../routes/PrivateRoute';
// import { RestrictedRoute } from '../../routes/RestrictedRoute';
import MainPage from "../../pages/mainPage/MainPage";
import LoginPage from "../../pages/loginPage/LoginPage";
// import RegisterPage from '../../pages/registerPage/RegisterPage';
// import DiaryPage from '../../pages/diaryPage/DiaryPage';
import CalculatorPage from "../../pages/calculatorPage/CalculatorPage";
// import Header from '../header/Header';
import css from "./App.module.css";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={css.appContainer}>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/*
          <Route
            path="/login"
            element={
             <RestrictedRoute redirectTo="/diary">
                <LoginPage />
            </RestrictedRoute>
            }
          />
          
          <Route
            path="/register"
            element={
              <RestrictedRoute redirectTo="/diary">
                <RegisterPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/diary"
            element={
              <PrivateRoute>
                <DiaryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/calculator"
            element={
              <PrivateRoute>
                <CalculatorPage />
              </PrivateRoute>
            }
          /> 
          */}
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
