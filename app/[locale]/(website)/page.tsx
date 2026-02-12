import HomePageAbout from "@/components/HomePageAbout";
import HomePageContact from "@/components/HomePageContact/HomePageContact";
import HomePagePortfolio from "@/components/HomePagePortfolio";
import HomePageVideo from "@/components/HomePageVideo";
import BottomNav from "@/components/navbar/BottomNav";

const HomePage = () => {
  return (
    <div className="w-full">
      <HomePageVideo />
      <HomePageAbout />
      <HomePagePortfolio />
      <HomePageContact />
      <BottomNav />
    </div>
  );
};

export default HomePage;
