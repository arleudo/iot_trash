import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import { Header } from './components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { About, Contact, Home, TrashList } from '@/pages';
import { UserList } from './pages/UserList';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Header />
      <div className="pt-16">
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/about" Component={About} />
          <Route path="/contact" Component={Contact} />
          <Route path="/trash" Component={TrashList} />
          <Route path="/users" Component={UserList} />
        </Routes>
      </div>
    </Router>
  </StrictMode>,
)
