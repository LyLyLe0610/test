import { MetaTags } from "react-meta-tags";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";

const Home = () => {
    return (
        <div className="home">
            <MetaTags>
                <title>CYF Center | Trang chủ</title>
            </MetaTags>
            <Sidebar />
            <div className="homeContainer">
                <Header />
                <div className="main"></div>
            </div>
        </div>
    );
};

export default Home;
