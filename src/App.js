import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BrowseTrials from './BrowseTrials.js';
import BrowseFavourites from './BrowseFavourites.js';
import NotFound from './NotFound.js';

const App = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <React.Fragment>
                <Switch>
                    <Route exact path="/" component={BrowseTrials} />
                    <Route exact path="/favourites" component={BrowseFavourites} />
                    <Route component={NotFound} />
                </Switch>
            </React.Fragment>
        </BrowserRouter>
    )
}

export default App;