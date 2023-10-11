import PageNotFound from "./pages/PageNotFound";
import MainLayout from "./pages/MainLayout";
import Home from "./pages/Home";
import Flags from "./pages/Flags";
import CoatOfArms from "./pages/CoatOfArms";
import CountryDetails from "./pages/CountryDetails";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="flags" element={<Flags />} />
            <Route path="flags/:countryId" element={<CountryDetails />} />
            <Route path="coatofarms" element={<CoatOfArms />} />
            <Route path="coatofarms/:countryId" element={<CountryDetails />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
