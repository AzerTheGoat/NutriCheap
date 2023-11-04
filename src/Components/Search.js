import React, { useState } from 'react';
import axios from 'axios';
import ProductList from "./ProductList";
import Accordion from "./ProductList";
import TypingEffect from "./TypingEffect";
import photoZyzz from "./Images/pp_504x498-pad_600x600_f8f8f8-removebg-preview.png"

const Search = ({product, setProduct}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isScrapingFinish, setIsScrapingFinish] = useState(true);
    const indexTab = Math.floor(Math.random() * 9);
    const [isLoading, setIsLoading] = useState(false);
    const textAttente = [
            "“La nutrition est la clé du succès en bodybuilding. Vous pouvez vous entraîner dur, mais si vous ne mangez pas bien, vous ne verrez pas les résultats que vous voulez.” - Arnold Schwarzenegger\n",
            "“Je mange six fois par jour, toutes les deux heures et demie. Je consomme beaucoup de protéines, de glucides complexes et de bons lipides.” - Phil Heath\n",
            "“La nutrition est 70% du travail. Si vous ne nourrissez pas correctement vos muscles, ils ne vont pas se développer.” - Ronnie Coleman\n",
            "“Je suis un adepte du régime paléo. Je mange des aliments naturels et non transformés, comme la viande, les œufs, les fruits, les légumes et les noix.” - Frank Zane\n",
            "“Je ne compte pas les calories, je compte les nutriments. Je m’assure d’avoir un apport suffisant en protéines, en fibres, en vitamines et en minéraux.” - Jay Cutler\n",
            "“Je fais attention à ce que je mange, mais je ne me prive pas de plaisir. Je m’accorde un cheat meal par semaine, où je mange ce qui me fait envie.” - Dorian Yates\n",
            "“Je crois au pouvoir des superaliments. Je consomme régulièrement du gingembre, du curcuma, du thé vert, du miel et du citron pour booster mon immunité et ma récupération.” - Lee Haney\n",
            "“Je fais du jeûne intermittent. Je ne mange que pendant une fenêtre de huit heures par jour, et je reste à jeun le reste du temps. Cela me permet de contrôler mon apport calorique et d’optimiser ma production d’hormones.” - Terry Crews\n",
            "“Je bois beaucoup d’eau. C’est essentiel pour rester hydraté, éliminer les toxines et favoriser la synthèse protéique.” - Lou Ferrigno"
        ]

    const textBonjour = ["Bienvenue sur le site de comparaison de prix des compléments alimentaires pour sportifs. Ce site vous permet de comparer les prix et les caractéristiques des produits de quatre marques réputées : MyProtein, Bulk, NutriMuscle et GreenWhey. Que vous cherchiez une whey, une créatine ou une vitamine, vous trouverez facilement le produit qui vous convient en cliquant sur les boutons présents en haut à droite. Bonne visite ! 😊\n" +
    "\n" +
    "Sinon, mettez votre recherche dans la barre de recherche et nous vous afficherons les meilleurs résultats. 😉"]


    const handleSearch = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        let data = {
            "recherche" : searchTerm
        }
        try {
            const response = await axios.post('http://localhost:8080/api/getCompany/products', data)
            setProduct(response.data)
            setIsScrapingFinish(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="max-w-screen flex justify-center">
            {(product.length === 0) ?
                <>
                {isScrapingFinish &&
                <>
                    <div className="w-2/5">
                        {isLoading ?
                            <div className="mt-48">
                                <TypingEffect text={textAttente[indexTab]}/>
                            </div>
                            :
                            <div className="mt-20">
                                <div
                                    className={"flex justify-center  font-mono px-24 text-xl bg-transparent font-sans dark:text-gray-200"}>{textBonjour}</div>
                            </div>
                        }
                    </div>

                    <div className="w-3/5 mt-56">
                        <form onSubmit={handleSearch}>
                            <div className="flex items-center justify-center but">
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                             fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="search"
                                        id="default-search"
                                        className="block p-4 pl-10 pr-96 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Search Whey, Creatine..."
                                        required
                                        value={searchTerm}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="submit"
                                        className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Loading...' : 'Search'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </>
            }
            </>: <Accordion product={product}/>}
            </div>
    );
};

export default Search;
