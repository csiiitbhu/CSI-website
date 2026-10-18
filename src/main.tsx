
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import IntroLoader from './components/IntroLoader'
import './styles.css'

function Root() {
  const [showLoader, setShowLoader] = useState(true)

  return (
    <>
      <RouterProvider router={router} />

      {showLoader && (<IntroLoader onComplete={() => setShowLoader(false)}/>)}
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
