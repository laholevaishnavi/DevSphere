import { Routes, BrowserRouter, Route  } from 'react-router-dom';
import Layout from './Components/Layout';
import Profile from './Components/Profile.jsx';
import Login from './Components/Login.jsx';
import Connections from './Components/Connections.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import Feed from './Components/Feed.jsx';
import Requests from './Components/Requests.jsx';
import { Toaster } from 'react-hot-toast';
import {Provider} from 'react-redux';
import appStore from './utils/appStore';
import PremiumPayment from './Components/PremiumPayment.jsx';
import Chat from './Components/Chat.jsx';
const App = () => {
  return(
    <>
<Provider store={appStore}><BrowserRouter basename="/">
<Toaster position="top-center" />

<Routes>
<Route path="/" element={<Layout/>}>
  <Route
    path="/"
    element={
      <ProtectedRoute>
        <Feed />
      </ProtectedRoute>
    }
  />
   <Route
        path="/feed"
        element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        }
      />
  <Route path="/login" element={<Login/>}/>
  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    }
  />
  <Route
    path="/connections"
    element={
      <ProtectedRoute>
        <Connections />
      </ProtectedRoute>
    }
  />
  <Route
    path="/requests"
    element={
      <ProtectedRoute>
        <Requests />
      </ProtectedRoute>
    }
  />
  <Route
    path="/premium"
    element={
      <ProtectedRoute>
        <PremiumPayment />
      </ProtectedRoute>
    }
  />
  <Route
    path="/chats/:target_id"
    element={
      <ProtectedRoute>
        <Chat />
      </ProtectedRoute>
    }
  />
</Route>
</Routes>
</BrowserRouter>
</Provider>
</>
  )
}

export default App