import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route } from "react-router-dom";
import SearchPage from "./Pages/SearchPage";
import { Container } from "react-bootstrap";
import NavBar from "./Components/NavBar";
import Job from "./Pages/Job";
import Favorites from "./Pages/Favorites";

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Route exact path="/" render={(props) => <SearchPage {...props} />} />
        <Route exact path="/jobs/:id" render={(props) => <Job {...props} />} />
        <Route
          exact
          path="/favorites"
          render={(props) => <Favorites {...props} />}
        />
      </Container>
    </>
  );
}

export default App;
