import { Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import RestrictedRoute from "../../routes/RestrictedRoute";
import Header from "../header/Header";
import css from "./App.module.css";
import PrivateRoute from "../../routes/PrivateRoute";
import Loader from "../loader/Loader";
import { refreshUser } from "../../redux/auth/operations";
import { selectToken } from "../../redux/auth/selectors";

// const MainPage = lazy(() => new Promise(() => {})); // loader test etmek için bug
const MainPage = lazy(() => import("../../pages/mainPage/MainPage"));
const DiaryPage = lazy(() => import("../../pages/diaryPage/DiaryPage"));
const CalculatorPage = lazy(() =>
  import("../../pages/calculatorPage/CalculatorPage")
);
const LoginPage = lazy(() => import("../../pages/loginPage/LoginPage"));
const RegisterPage = lazy(() =>
  import("../../pages/registerPage/RegisterPage")
);

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch, token]);

  return (
    <Suspense fallback={<Loader />}>
      <div className={css.appContainer}>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/calculator" element={<CalculatorPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/diary" element={<DiaryPage />} /> */}

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

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
