import "./assets/app-style.scss";
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import Body from "./components/Body/index";

function App() {
    return (
        <div className="home-page">
            <Header />
            <Body />
            <Footer />
        </div>
    );
}

export default App;
