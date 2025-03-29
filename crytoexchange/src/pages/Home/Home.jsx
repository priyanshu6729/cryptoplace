import "bootstrap/dist/css/bootstrap.min.css";
import chart from "../../assets/chart.png";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src={chart}
              className=" image_color"
              alt="Bootstrap Themes"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6 hero1">
            <h1 className="display-5 fw-bold lh-2 mb-3 ">
              Cryptocurrency <br /> price Tracker
            </h1>
            <p className="lead">
              Welcome to the worlds best cryptocurrency price tracker, where
              you get updated to the latest marketplace.Sign up to explore more
              bout cryptos.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                type="button"
                onClick={() => window.location.replace("/Coin-List")}
                className="btn btn-primary btn-lg px-4 me-md-2 home_button"
              >
                Explore more
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
