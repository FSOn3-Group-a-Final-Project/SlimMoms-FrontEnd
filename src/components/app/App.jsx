
import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
// import PrivateRoute from '../../routes/PrivateRoute';
import  RestrictedRoute  from '../../routes/RestrictedRoute';
import MainPage from "../../pages/mainPage/MainPage";
import DiaryPage from "../../pages/diaryPage/DiaryPage";
import CalculatorPage from "../../pages/calculatorPage/CalculatorPage";
// import Header from '../header/Header';
import css from "./App.module.css";
import PrivateRoute from "../../routes/PrivateRoute";

const LoginPage = lazy(() => import("../../pages/loginPage/LoginPage"));
const RegisterPage = lazy(() =>
  import("../../pages/registerPage/RegisterPage")
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={css.appContainer}>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />

          {/* <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/diary" element={<DiaryPage />} />
          {/*
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/diary">
                <LoginPage />
              </RestrictedRoute>
            }
          />
          {/*
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
