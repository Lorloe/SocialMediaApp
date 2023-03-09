import './navbar.scss';
import HomeIcon from '@mui/icons-material/Home';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import GridViewIcon from '@mui/icons-material/GridView';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration:"none" }}>
        <span>Lorloe Social</span>
        </Link>
        <HomeIcon/>
        {darkMode ? (
          <WbSunnyIcon onClick={ toggle }/>
        ) : (
          <DarkModeIcon onClick={toggle}/>
        )}
        <GridViewIcon/>
        <div className="search">
          <SearchIcon/>
          <input type="text" placeholder='Search...'/>
        </div>
      </div>
      <div className="right">
        <PersonOutlineIcon/>
        <MailIcon/>
        <NotificationsIcon/>
        <div className="user">
          <img src={"/upload/" + currentUser.profilePic} alt="" />
          <Link to ={"/profile/${userId}"} style={{ textDecoration: "none", color: "inherit" }}></Link>
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar