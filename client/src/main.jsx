import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/AuthProvider'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <AuthProvider>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </AuthProvider>
      </Provider>
    </Router>
  </React.StrictMode>
)
