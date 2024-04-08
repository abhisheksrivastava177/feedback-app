import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./components/pages/AboutPage";
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import AboutIconLink from "./components/AboutIconLink";
import { FeedbackContextProvider } from "./context/FeedbackContext";

function App() {
    
    return (
        <FeedbackContextProvider>
            <Router>
                <Header />
                <div className="container">
                    

                    <Routes>
                        <Route exact path='/' element={
                            <>
                                <FeedbackForm />
                                <FeedbackStats />
                                <FeedbackList />
                                <AboutIconLink />
                            </>
                        } />
                        
                        <Route path="/about" Component={AboutPage}>This is the about route</Route>
                    </Routes>
                    
                </div>
            </Router>
        </FeedbackContextProvider>
    )
}

export default App;