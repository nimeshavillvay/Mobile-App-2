import SpecialNoticesBar from "./special-notices-bar";
import TopBar from "./top-bar";

const Header = async () => {
  const longNoticeText =
    "🚨 Breaking News: In an unprecedented turn of events, scientists have discovered a hidden civilization living in the Earth's core";

  return (
    <header className="flex flex-col gap-4 border-b border-b-wurth-gray-250 pb-5 shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05),0px_1px_2px_-1px_rgba(0,0,0,0.05)] md:border-0 md:pb-0 print:hidden">
      <TopBar
        phoneNumber="800-289-2237"
        email="southernsales@wurthlac.com"
        companyName="Würth Baer Supply Company"
      />
      <SpecialNoticesBar noticeText={longNoticeText} />
    </header>
  );
};

export default Header;
