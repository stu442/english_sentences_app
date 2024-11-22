import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/error-page.tsx'
import ListPage from './pages/listPage.tsx'
import LoginPage from './pages/loginPage.tsx'
import FlashcardPage from './pages/flashCardPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/error',
    element: <ErrorPage />,
  },
  {
    path: '/list',
    element: <ListPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/flashcard',
    element: <FlashcardPage />,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
