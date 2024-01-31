import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthForm from './pages/AuthForm'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/form' element={<AuthForm />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
