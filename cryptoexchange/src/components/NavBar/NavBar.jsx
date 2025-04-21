import "./NavBar.css";
import arrow_icon from "../../assets/arrow_icon.png";
import logo from "../../assets/remove-removebg-preview-1.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="nav_bar">
      <img onClick={() => navigate(ROUTES.HOME)} src={logo} alt="" className="logo" />
      <ul className="nav_links">
        <li onClick={() => navigate(ROUTES.HOME)}>Home</li>
        <li>Features</li>
        <li onClick={() => navigate(ROUTES.COIN_LIST)}>Pricing</li>
        <li>Blog</li>
      </ul>

      <div className="right_nav">
        <button className="login">Login</button>
        <button className="sign-up">
          Sign Up <img src={arrow_icon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
