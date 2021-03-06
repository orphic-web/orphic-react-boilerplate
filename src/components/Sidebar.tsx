import './Sidebar.css';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import SupportedLanguages from '../models/enums/SupportedLanguages';
import { updateLanguage } from '../store/slices/UserSlice';
import UserService from '../services/UserService';
import Logo from '../theme/assets/logo.svg';
import Hamburger from './Hamburger';
import translator from '../theme/translator.json';
import TranslatorUtils from '../utils/TranslatorUtil';
import { toggleSpinner } from '../store/slices/SpinnerSlice';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.user.language) as string | any;

  const [navOpen, setnavOpen] = useState(false);
  const [menuBusy, setMenuBusy] = useState(false);

  const toggleMenu = (e: any) => {
    if (menuBusy) return;

    setMenuBusy(true);
    if (!navOpen) document.body.classList.add('nav-open');
    else document.body.classList.remove('nav-open');

    setnavOpen(!navOpen);

    // ? Can we do this some other way? Events calling twice elsewise
    setTimeout(() => {
      setMenuBusy(false);
    }, 1);
  };

  const toggleLanguage = async () => {
    try {
      if (language === SupportedLanguages.EN) dispatch(updateLanguage(SupportedLanguages.FR));
      else dispatch(updateLanguage(SupportedLanguages.EN));
    } catch (e: any) {
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      dispatch(toggleSpinner(true));
      await UserService.logout();
      dispatch(toggleSpinner(false));
      navigate('/login');
    } catch (e: any) {
      console.log(e);
    }
  };

  // eslint-disable-next-line consistent-return
  const getActiveMenuItem = (url: string) => {
    try {
      let itemIsActive = false;
      if (location.pathname === url) itemIsActive = true;
      return itemIsActive;
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="sidebar__wrapper">
        <div className="sidebar__logo" onClick={() => navigate('/dashboard')}>
          {
            language === SupportedLanguages.EN
              ? <img src={Logo} alt="logo" />
              : <img src={Logo} alt="logo" />
          }
        </div>
        <div className="sidebar__hamburger">
          <Hamburger onClick={(e: any) => toggleMenu(e)}/>
        </div>
        <Box sx={{ width: '100%' }}>
          <List>
            <ListItem key={'dashboard'} disablePadding>
              <ListItemButton
                selected={getActiveMenuItem('/')}
                onClick={() => navigate('/')}>
                <ListItemIcon>
                  <DashboardIcon></DashboardIcon>
                </ListItemIcon>
                <ListItemText primary={TranslatorUtils.getTranslation(language, translator.menu.dashboard)} />
              </ListItemButton>
            </ListItem>
            <ListItem key={'login'} disablePadding>
              <ListItemButton
                selected={getActiveMenuItem('/login')}
                onClick={() => navigate('/login')}>
                <ListItemIcon>
                  <LockOpenIcon></LockOpenIcon>
                </ListItemIcon>
                <ListItemText primary={TranslatorUtils.getTranslation(language, translator.menu.login)} />
              </ListItemButton>
            </ListItem>
            <ListItem key={'signup'} disablePadding>
              <ListItemButton
                selected={getActiveMenuItem('/signup')}
                onClick={() => navigate('/signup')}>
                <ListItemIcon>
                  <HowToRegIcon></HowToRegIcon>
                </ListItemIcon>
                <ListItemText primary={TranslatorUtils.getTranslation(language, translator.menu.signup)} />
              </ListItemButton>
            </ListItem>
            <div
              className='sidebar__btn-language'
            >
              <Button
                onClick={() => toggleLanguage()}
                color='light'
                size='small'
                variant='outlined'>
                {TranslatorUtils.getTranslation(language, translator.menu.language)}
              </Button>
            </div>

          </List>
        </Box>
        <div className='sidebar__logout'>
          <Button
            onClick={() => logout()}
            color='error'
            size='small'
            fullWidth
            variant='outlined'>
            {TranslatorUtils.getTranslation(language, translator.menu.logout)}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
