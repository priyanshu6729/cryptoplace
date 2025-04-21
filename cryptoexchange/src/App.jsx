import NavBar from "./components/NavBar/NavBar";
import {Routes , Route} from 'react-router-dom';
import Home from "./pages/Home/Home";
import Coin from "./pages/Coin/Coin";
import Search from "./pages/Search/Search";
import Footer from "./components/Footer/Footer";
import { ROUTES } from "./utils/constants";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.COIN_LIST} element={<Search />} />
        <Route path={ROUTES.COIN_DETAILS} element={<Coin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;