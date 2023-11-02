import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";
import Wrapper from "./components/Wrapper";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Wrapper />}>
            <Route index element={<Home />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
