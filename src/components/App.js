import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from "../components/Header";
import Home from "../pages/Home";
import Cheeses from "../pages/Cheeses";
import Boards from "../pages/Boards";
import Sides from "../pages/Sides";
import Footer from "../components/Footer";

import './App.css'

const App = () => {

    const [user, setUser] = useState({});

	// function localStorageUser() {
	// 	if (localStorage.getItem('user')) {
	// 		const localStorageUser = JSON.parse(localStorage.getItem('user'));
	// 		return localStorageUser;
	// 	} else {
	// 		return {};
	// 	}
    // }
    
	// useEffect(() => {
	// 	setUser(localStorageUser());
	// }, []);

    return (
        <>
            <Router>
                <Header user={user} setUser={setUser} />
                <div id="all">
                    <main>
                        <Switch>
                            <Route path="/cheeses">
                                <Cheeses />
                            </Route>
                            <Route path="/boards">
                                <Boards />
                            </Route>
                            <Route path="/sides">
                                <Sides />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </main>
                    <Footer />
                </div>
            </Router>
        </>
    )
};

export default App;