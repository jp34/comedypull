import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";
import Wrapper from "./components/Wrapper";
import Home from "./pages/Home";
import GeoStore from "./store/GeoStore";
import { useGeolocated } from "react-geolocated";

const App = () => {
    
    const { coords, isGeolocationAvailable, isGeolocationEnabled} = useGeolocated({
        positionOptions: {
          enableHighAccuracy: false
        },
        userDecisionTimeout: 5000
    });
    
    if (coords) {
        GeoStore.getState().actions.setGeo(
            coords.latitude,
            coords.longitude
        );
    } else if (!isGeolocationAvailable) {
        console.log("Geolocation not available");
    } else if (!isGeolocationEnabled) {
        console.log("Geolocation is not enabled");
    }

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
