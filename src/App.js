import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SpotifyClone from './components/SpotifyClone'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './components/Profile'
import YourMusic from './components/YourMusic'
import Playlists from './components/Playlists'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={SpotifyClone} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute exact path="/yourmusic" component={YourMusic} />
      <ProtectedRoute exact path="/playlists" component={Playlists} />
    </Switch>
  </BrowserRouter>
)

export default App
