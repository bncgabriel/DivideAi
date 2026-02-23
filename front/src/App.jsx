import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import DashboardPage from './pages/DashboardPage'
import GroupDetailsPage from './pages/GroupDetailsPage'
import LoginPage from './pages/LoginPage'
import MyGroupsPage from './pages/MyGroupsPage'
import NewExpensePage from './pages/NewExpensePage'
import SettingsPage from './pages/SettingsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/groups" element={<MyGroupsPage />} />
      <Route path="/groups/:groupId" element={<GroupDetailsPage />} />
      <Route path="/groups/:groupId/expense/new" element={<NewExpensePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
