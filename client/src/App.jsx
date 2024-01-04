import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useGeolocated } from "react-geolocated";
import { Layout } from "components";
import { Home } from "views";
import GeoStore from "./store/GeoStore";
import "./App.css";

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
					<Route path="/" element={<Layout />}>
					    <Route index element={<Home />}/>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
