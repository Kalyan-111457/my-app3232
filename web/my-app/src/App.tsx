import { Route, Routes } from 'react-router-dom'
import LoginForm from './Login/pages/LoginForm'
import CreateJob from './features/Jobs/pages/CreateJob'
import UserForm from './features/Jobs/pages/UserForm'
import JobApplyPage from './features/users/pages/JobApplyPage'
import UserHomePage from './features/users/pages/UserHomePage'
import { AllUsersDataWithJOb } from './features/Jobs/pages/AllUsersDataWithJOBs'
import { AiJobsPage } from './features/Jobs/pages/AiJobsPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/users" element={<UserForm />} />
        <Route path="/jobs" element={<CreateJob />} />
        <Route path="/ApplyJob" element={<JobApplyPage />} />
        <Route path="/alljobs" element={<UserHomePage />} />
        <Route path='/AllJobsByJobIdWithAi' element={<AllUsersDataWithJOb/>}/>
        <Route path='/AIJobs/:id' element={<AiJobsPage/>}/>
      </Routes>

    </>
  )
}

export default App
