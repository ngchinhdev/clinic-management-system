import MainHeader from "./MainHeader";
import TopHeader from "./TopHeader";
import NavigationBarMobile from "./NavigationBarMoblie";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 shadow-lg">
      <NavigationBarMobile />
      <TopHeader />
      <MainHeader />
    </header>
  );
}
