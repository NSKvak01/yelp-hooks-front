import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import MainRouter from './MainRouter'
import Spinner from "./components/Spinner/Spinner"
import AuthContextWrapper from './context/AuthContext'

function App() {
  return(
    <React.Suspense fallback={<Spinner />}>
      <Router>
        <AuthContextWrapper>
          <MainRouter />
        </AuthContextWrapper>
      </Router>
    </React.Suspense>
  )
}

export default App
