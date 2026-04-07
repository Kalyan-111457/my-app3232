import { Route, Routes } from 'react-router-dom'
import LoginForm from './Login/pages/LoginForm'
import CreateJob from './features/Jobs/pages/CreateJob'
import UserForm from './features/Jobs/pages/UserForm'
import JobApplyPage from './features/users/pages/JobApplyPage'
import UserHomePage from './features/users/pages/UserHomePage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/users" element={<UserForm />} />
        <Route path="/jobs" element={<CreateJob />} />
        <Route path="/ApplyJob" element={<JobApplyPage />} />
        <Route path="/alljobs" element={<UserHomePage />} />
      </Routes>

    </>
  )
}

export default App
