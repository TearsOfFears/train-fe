import { Route, Routes } from 'react-router-dom';
import Error404 from './utils/error';
import Trains from './pages/Trains';
import Users from './pages/Users';
import Navbar from './components/navBar';
import { useAppDispatch } from './store/hooks';
import { getTokenFromLocalStorage } from './utils/localstorage';

import { useEffect } from 'react';
import { ProtectedRoute } from './components/protectedRoute';
import Tickets from './pages/Tickets';
import CreateTrain from './pages/train/CreateTrain';
import EditTrain from './pages/train/EditTrain';
import Login from "./pages/Login";
import Register from "./pages/Register";
import {login, logout} from "./store/slices/authSlices";
import {useGetProfileQuery, useLazyGetProfileQuery} from "./store/services/auth.api";

function App() {
    const [getAuthData] = useLazyGetProfileQuery()
    const dispatch = useAppDispatch()

    useEffect(() => {
        const main = async () => {
            const token = getTokenFromLocalStorage()
            if (token) {
                try {
                    const { data } = await getAuthData()
                    dispatch(login(data))
                }catch (e) {
                    dispatch(logout())
                }
            }
        }
        main()
    }, [dispatch, getAuthData])

  return (
    <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Trains />}/>
          <Route path="/:id" element={<Tickets />} />
          <Route path="/:id/:edit" element={<ProtectedRoute><EditTrain/></ProtectedRoute> } />
          <Route path="/create" element={<ProtectedRoute><CreateTrain/></ProtectedRoute>}  />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="*" element={<Error404 />} />
        </Routes>
    </div>
  );
}

export default App;
