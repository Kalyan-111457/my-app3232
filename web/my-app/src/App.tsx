import { Route, Routes } from 'react-router-dom'
import AllJobs from './features/Jobs/pages/AllJobs'
import UsersEditPage from './features/users/pages/UsersEditPage'
import LoginForm from './Login/pages/LoginForm'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/users" element={<UsersEditPage />} />
        <Route path="/jobs" element={<AllJobs />} />
      </Routes>

    </>
  )
}

export default App
