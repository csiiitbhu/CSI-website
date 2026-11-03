import { useState } from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import IntroLoader from './components/IntroLoader'

export default function App() {
  const [showLoader, setShowLoader] = useState(true)

  return (
    <>
      <RouterProvider router={router} />
      {showLoader && <IntroLoader onComplete={() => setShowLoader(false)} />}
    </>
  )
}

export { router }
