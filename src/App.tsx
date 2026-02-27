import { lazy, Suspense } from "react";

import LayoutLoading from "./components/Assets/LayoutLoading";
import { Route, Routes } from "react-router-dom";
import AdminProtected from "./components/Assets/AdminProtected";
import AdminAddOrder from "./components/Admin/AdminAddOrder";
import AdminProducts from "./components/Admin/AdminProducts";
import AdminProductPage from "./components/Admin/AdminProductPage";
import DiscountListsPage from "./components/Admin/Discount/DiscountListsPage";
import DiscountItemPage from "./components/Admin/Discount/DiscountItemPage";
import CreateDiscountPage from "./components/Admin/Discount/CreateDiscountPage";

const AdminLayout = lazy(() => import("./components/Admin/AdminLayout"));
const UserLayout = lazy(() => import("./components/Assets/UserLayout"));
const DetailsPage = lazy(() => import("./pages/DetailsPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const Checkout = lazy(() => import("./pages/Checkout"));
const VerifyPage = lazy(() => import("./pages/VerifyPage"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Suspense fallback={<LayoutLoading />}>
        <Routes>
          <Route path="/admin-dashboard" element={<AdminLayout />}>
            <Route
              path="/admin-dashboard"
              element={
                <AdminProtected>
                  <AdminDashboard />
                </AdminProtected>
              }
            />
            <Route
              path="/admin-dashboard/order/:id"
              element={
                <AdminProtected>
                  <OrderDetail />
                </AdminProtected>
              }
            />
            <Route
              path="/admin-dashboard/admin-add-order"
              element={
                <AdminProtected>
                  <AdminAddOrder />
                </AdminProtected>
              }
            />
            <Route
              path="/admin-dashboard/products"
              element={
                <AdminProtected>
                  <AdminProducts />
                </AdminProtected>
              }
            />
            {/*  <Route
              path="/admin-dashboard/products/new"
              element={
                <AdminProtected>
                  <AdminProductPage />
                </AdminProtected>
              }
            /> */}
            <Route
              path="/admin-dashboard/products/:id"
              element={
                <AdminProtected>
                  <AdminProductPage />
                </AdminProtected>
              }
            />
            <Route
              path="/admin-dashboard/discounts"
              element={
                <AdminProtected>
                  <DiscountListsPage />
                </AdminProtected>
              }
            />
            <Route
              path="/admin-dashboard/discounts/new"
              element={
                <AdminProtected>
                  <CreateDiscountPage />
                </AdminProtected>
              }
            />
            <Route
              path="/admin-dashboard/discounts/:id"
              element={
                <AdminProtected>
                  <DiscountItemPage />
                </AdminProtected>
              }
            />
          </Route>

          <Route element={<UserLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<HomePage />} />
            <Route path="/b/:slug" element={<DetailsPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/verify" element={<VerifyPage />} />
          </Route>
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
