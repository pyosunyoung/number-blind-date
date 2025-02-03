import React from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from '../page/HomePage/HomePage';
import PrivateRoute from './PrivateRoute';
import MyPage from '../page/MyPage/MyPage';
import AdminPage from '../page/AdminPage/AdminPage';
import RegisterPage from '../page/RegisterPage/RegisterPage';

import IntroPage from '../page/IntroPage/IntroPage';
import NoticePage from '../page/NoticePage/NoticePage';
import AIMatchingPage from '../page/AIMatchingPage/AIMatchingPage';
import LoginPage from '../page/LoginPage/LoginPage';
import AppLayout from '../Layout/AppLayout';
const AppRouter = () => {
  return (
    
    <Routes>
      {/* AppLayout을 기본 레이아웃으로 적용 */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/NoticePage" element={<NoticePage />} />
        <Route path="/AIMatchingPage" element={<AIMatchingPage />} />

        <Route element={<PrivateRoute permissionLevel="customer" />}>
          <Route path="/mypage" element={<MyPage />} />
        </Route>
        <Route path="/adminpage" element={<AdminPage permissionLevel="admin" />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
