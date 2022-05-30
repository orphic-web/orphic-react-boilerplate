import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider, CssBaseline, Button } from '@mui/material';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import themeConfig from './theme/ThemeConfig';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import NotFound from './pages/NotFound';
import AvailableLanguages from './models/enums/AvailableLanguages';
import { auth } from './FirebaseConfig';
import { useAppDispatch } from './store/Hooks';
import { updateFirebaseUser, updateLanguage } from './store/slices/UserSlice';
import AlertsManager from './components/AlertsManager';
import AlertUtil from './utils/AlertUtil';
import AlertSeverity from './models/enums/AlertSeverity';

function App() {
  const theme = createTheme(themeConfig);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const unsubscribe = () => { };

      auth.onAuthStateChanged(async (firebaseUser: any) => {
        if (firebaseUser) {
          // unsubscribe = await db.collection('Users').doc(firebaseUser.uid)
          //   .onSnapshot(async (doc: any) => {
          //     // Should subscribe to firestore user data here
          //   });
          dispatch(updateFirebaseUser(firebaseUser));
          dispatch(updateLanguage(AvailableLanguages.DEFAULT));
        } else {
          dispatch(updateFirebaseUser(null));
          dispatch(updateLanguage(AvailableLanguages.DEFAULT));
        }
      });

      return unsubscribe;
    } catch (e: any) {
      console.error(e);
      return e;
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route index element={<Dashboard />}/>
              <Route path='login' element={<Login />}/>
              <Route path='signup' element={<Signup />}/>
              <Route path='forgot-password' element={<ForgotPassword />}/>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Button style={{ position: 'absolute', top: '100px', left: '100px' }}
          onClick={() => AlertUtil.createAlert(AlertSeverity.SUCCESS, 'laksdjlaksjdlakjsdlkajsldk', dispatch)}>
            try me ~ 1
        </Button>
        <AlertsManager/>
      </div>
    </ThemeProvider>

  );
}

export default App;
