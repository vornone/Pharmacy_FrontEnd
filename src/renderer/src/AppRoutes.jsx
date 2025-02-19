// src/Routes.js
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProductPage from './pages/product/ProductPage'
import ImportPage from './pages/import/ImportPage'
import POSPage from './pages/pospage/POSPage'
import HomePage from './pages/homepage/HomePage'
import AdminPage from './pages/admin/AdminPage'
import CategoryPage from './pages/category/CategoryPage'
import SalePage from './pages/sales/SalePage'
function AppRoutes() {
  return (
    <Routes>
      <Route path="/product" element={<ProductPage />} />
      <Route path="/import" element={<ImportPage />} />
      <Route path="/pos" element={<POSPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/sale" element={<SalePage />} />
    </Routes>
  )
}

export default AppRoutes
