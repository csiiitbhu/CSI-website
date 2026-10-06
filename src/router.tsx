import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Team from './pages/Team'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
const root = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col">
      <Navbar /><main className="flex-1"><Outlet /></main><Footer />
    </div>
  ),
})
const page = <P extends string>(path: P, component: () => React.JSX.Element) => createRoute({ getParentRoute: () => root, path, component })
const routeTree = root.addChildren([page('/', Home), page('/our-team', Team), page('/events', Events), page('/gallery', Gallery)])
export const router = createRouter({ routeTree, scrollRestoration: true })
declare module '@tanstack/react-router' { interface Register { router: typeof router } }
