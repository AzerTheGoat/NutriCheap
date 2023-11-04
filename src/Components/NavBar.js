import photoZyzz from "./Images/pp_504x498-pad_600x600_f8f8f8-removebg-preview.png";
import React, {useState} from "react";
import Accordion from "./ProductList";
import axios from "axios";


const NavBar = ({setProduct}) => {
    const handleWheyClick = async () => {
        const response = await axios.get('http://localhost:8080/api/getCompany/getwhey');
        setProduct(response.data);
    };
    const handleCreainteClick = async () => {
        const response = await axios.get('http://localhost:8080/api/getCompany/getcreatine');
        setProduct(response.data);
    };
    const handleVitamineClick = async () => {
        const response = await axios.get('http://localhost:8080/api/getCompany/getvitamine');
        setProduct(response.data);
    };

    return (
        <>
            <div className="flex items-center justify-between bg-gradient-to-r from-cyan-500 to-blue-500">
                <img src={photoZyzz} alt="photozyzz" style={{ maxWidth: "6%" }} className="ml-5 mt-2" onClick={() => window.location.reload()} />
                <h1 className="mr-5 flex items-center">
                    <div className="text-white underline-animation hover:text-green-500 hover:font-bold hover:text-lg mr-2 w-24" onClick={handleWheyClick}>Whey</div>
                    <div className="text-white underline-animation hover:text-green-500 hover:font-bold hover:text-lg mr-2 w-24" onClick={handleCreainteClick}>Creatine</div>
                    <div className="text-white underline-animation hover:text-green-500 hover:font-bold hover:text-lg mr-2 w-24" onClick={handleVitamineClick}>Vitamines</div>
                </h1>
            </div>
        </>

    );
}


export default NavBar;