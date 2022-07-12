import { Home, AddFlight, Error, UpdateFlight } from "./pages";
import DeleteFlight from "./pages/DeleteFlight";
import { AppNav } from "./features";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import background from "./images/background.png";
const App = () => {
  return (
    <div styles={{ backgroundImage: `url(${background})` }}>
      {" "}
      {/*background image*/}.
      {/* Everything inside of here is going to be managed by react-router-dom
        to allow the site to toggle between pages */}
      <BrowserRouter>
        <AppNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AddFlight" element={<AddFlight />} />
          <Route path="/UpdateFlight" element={<UpdateFlight />} />
          <Route path="/DeleteFlight" element={<DeleteFlight />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
