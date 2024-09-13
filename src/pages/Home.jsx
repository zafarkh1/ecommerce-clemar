import Showcase from "../components/Showcase";
import Categories from "../components/Categories";
import BestProducts from "../components/BestProducts";
import Choose from "../components/Choose";
import Trust from "../components/Trust";
import News from "../components/News";
import Contact from "../components/Contact";

function Home(props) {
  return (
    <div id="home">
      <Showcase />
      <Categories />
      <BestProducts />
      <Choose />
      <Trust />
      <News />
      <Contact />
    </div>
  );
}

export default Home;
