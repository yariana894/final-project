import './App.css';
import NavBar from "./NavBar";
import {Route, Routes} from "react-router";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Register from "./Components/Register";
import ListFilm from "./Components/ListFilm";
import {AuthProvider} from './Context/authContext'
import Footer from "./Footer";
import React from "react";
import Ranking from "./Components/Ranking";
import RankingTV from "./Components/RankingTV";

function App() {
    return (
        <div className="bg-dark">
            <AuthProvider>
                <header><NavBar/></header>
                <main>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                        <Route path="saveFilms" element={<ListFilm/>}/>
                        <Route path="ranking" element={<Ranking/>}/>
                        <Route path="rankingTV" element={<RankingTV/>}/>
                    </Routes>
                </main>
                <Footer/>
            </AuthProvider>
        </div>
    );
}

export default App;
