import { Route, Routes } from 'react-router-dom'
import LoginForm from './Login/pages/LoginForm'
import CreateJob from './features/Jobs/pages/CreateJob'
import UserForm from './features/users/pages/UserForm'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/users" element={<UserForm />} />
        <Route path="/jobs" element={<CreateJob />} />
      </Routes>

    </>
  )
}

export default App
