import SideBarResponsive from "../../components/SideBarResponsive/SideBarResponsive";
import avatar from "../../../public/image/avatar.png";

const Header = () => {
  return (
    <div className=" bg-white">
      <div className="min-h-[65px] pr-4 flex items-center justify-between">
        <div>
          <SideBarResponsive />
        </div>
        <div>
          <img
            src={avatar}
            width="40px"
            className="rounded-full cursor-pointer shadow-md"
            alt="avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
