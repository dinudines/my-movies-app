import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './containers/HomePage';
import Favourites from './containers/Favourites';
import StickyHeader from './components/StickyHeader';

const App = () => {
    return (
        <Router>
            <StickyHeader />
            <Routes>
                <Route path="/my-movies-app" element={<HomePage />} />
                <Route path="/my-movies-app/favourites" element={<Favourites />} />
            </Routes>
        </Router>
    );
};

export default App