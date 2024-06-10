import SideBarResponsive from "../../components/SideBarResponsive/SideBarResponsive";

const Header = () => {
  return (
    <div className=" bg-white">
      <div className="min-h-[65px] pr-4 flex items-center justify-between">
        <div>
          <SideBarResponsive />
        </div>
        <div>
          <img
            src="/public/image/avatar.png"
            width="40px"
            className="rounded-full cursor-pointer shadow-md"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
