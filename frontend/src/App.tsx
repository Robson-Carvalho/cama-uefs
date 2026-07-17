import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import { Home } from "./pages/home";
import { Estudos } from "./pages/estudos";
import { Content } from "./pages/content";
import { NotFound } from "./pages/notFound";
import { About } from "./pages/about";

import { DataProvider } from "./contexts/data/dataProvider";
import { AdminSignIn } from "./pages/admin/signIn";
import { AdminDashboard } from "./pages/admin/dashboard";
import { RecoverPassword } from "./pages/admin/recoverPassword";
import { ConfirmRecoverPassword } from "./pages/admin/recoverPassword/confirm";
import { ConfirmEmailChange } from "./pages/admin/settings/confirm-email";
import { Instructors } from "./pages/admin/instructors";
import { AuthProvider } from "./contexts/auth/authProvider";
import { PrivateRoute } from "./components/privateRoute";
import { AdminSettings } from "./pages/admin/settings";
import { Topic } from "./pages/admin/topic";
import { Class } from "./pages/admin/class";
import { LoadPage } from "./components/loadPage";
import { AdminLayout } from "./pages/admin/components/layout";

const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<LoadPage />}>
              <Route index element={<Home />} />
              <Route path="/estudos" element={<Estudos />} />

              <Route path="/:class/:topic" element={<Content />} />

              <Route path="/about" element={<About />} />

              <Route path="/about" element={<About />} />

              <Route path="404" element={<NotFound />} />

              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/admin/login" element={<AdminSignIn />} />

            <Route
              path="/admin/recover/password"
              element={<RecoverPassword />}
            />

            <Route
              path="/admin/recoverPassword/confirm"
              element={<ConfirmRecoverPassword />}
            />

            <Route
              path="/admin/settings/confirm-email"
              element={<ConfirmEmailChange />}
            />

            <Route element={<PrivateRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/instructors" element={<Instructors />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/class/:id" element={<Class />} />
                <Route path="/admin/topic/:id" element={<Topic />} />
              </Route>
            </Route>
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
};

export { App };
