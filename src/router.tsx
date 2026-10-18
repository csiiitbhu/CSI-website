import React from 'react'
import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import TeamNew from './pages/TeamNew'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
import Register from './pages/Register'
import Achievements from './pages/Achievements'

const root = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col">
      <Navbar /><main className="flex-1"><Outlet /></main><Footer />
    </div>
  ),
})

const page = <P extends string>(path: P, component: () => React.JSX.Element) => createRoute({ getParentRoute: () => root, path, component })
const registerRoute = createRoute({ getParentRoute: () => root, path: '/events/$eventId/register', component: Register })
const routeTree = root.addChildren([
  page('/', Home),
  page('/our-team', TeamNew),
  page('/events', Events),
  registerRoute,
  page('/gallery', Gallery),
  page('/achievements', Achievements)
])

export const router = createRouter({ routeTree, scrollRestoration: true })

declare module '@tanstack/react-router' { interface Register { router: typeof router } }