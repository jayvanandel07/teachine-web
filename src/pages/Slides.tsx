import React from "react";
import Slide from "../components/SlidesPanel/Slide";
import { useNavigate } from "react-router-dom";

const Slides = () => {
    const Dummy: string[] = [""];
    const navigate = useNavigate();

    return Dummy.map((slide) => (
        <div
            onClick={() => {
                navigate("/presentation");
            }}
        >
            <Slide></Slide>
        </div>
    ));
};

export default Slides;
