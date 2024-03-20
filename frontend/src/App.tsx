import { RouterProvider, createRoutesFromElements } from "react-router-dom"
import Code from "./pages/Code"
import RootLayout from "./components/RootLayout"
import { createBrowserRouter, Route } from "react-router-dom"
import Submission from "./pages/Submission"
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Code />} />
      <Route path="/submission" element={<Submission />} />
    </Route>

  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
