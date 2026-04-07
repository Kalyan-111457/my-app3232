import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { JobProvider } from './features/users/pages/CreateContextSingleJob.tsx'
import { AllJobsProvider } from './features/users/pages/AllJobsCreateContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AllJobsProvider>
      <JobProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </JobProvider>
    </AllJobsProvider>
  </StrictMode>,
)
