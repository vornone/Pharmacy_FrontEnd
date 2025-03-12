import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy-loaded components
const ProductPage = React.lazy(() => import('./pages/product/ProductPage'));
const ImportPage = React.lazy(() => import('./pages/import/ImportPage'));
const POSPage = React.lazy(() => import('./pages/pospage/POSPage'));
const HomePage = React.lazy(() => import('./pages/homepage/HomePage'));
const AdminPage = React.lazy(() => import('./pages/admin/AdminPage'));
const CategoryPage = React.lazy(() => import('./pages/category/CategoryPage'));
const SalePage = React.lazy(() => import('./pages/sales/SalePage'));
const UserPage = React.lazy(() => import('./pages/UserManagement/users/UserPage'));

// Fallback UI for lazy loading
const LoadingFallback = () => <div>Loading...</div>;

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/product/*" element={<ProductPage />} />
        <Route path="/import/*" element={<ImportPage />} />
        <Route path="/pos/*" element={<POSPage />} />
        <Route path="/home/*" element={<HomePage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/category/*" element={<CategoryPage />} />
        <Route path="/sale/*" element={<SalePage />} />
        <Route path="/usermanagement/*" element={<UserPage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;