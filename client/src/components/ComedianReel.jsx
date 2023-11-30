import "../css/ComedianReel.css";
import { ComedianStore } from "../store";
import ComedianCard from "./ComedianCard";

const ComedianReel = () => {

    const comedians = ComedianStore.getState().comedians;

    return (
        <div className="comedian-reel">
            {comedians.map((c) => <ComedianCard comedian={c} />)}
        </div>
    );
}

export default ComedianReel;
