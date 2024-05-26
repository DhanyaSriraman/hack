import MatsyaLogo from "../Assets/Logo12.png";

function LogoHolder() {
  return (
    <div className="bg-[#494949] w-[23vw] h-[100vh] text-white ">
      <div className="flex flex-col justify-between h-[80vh]">
        <img
          src={MatsyaLogo}
          alt="Logo"
          className="w-[17vw] h-[30vh] py-3 mx-auto"
        />
        <div className="flex flex-col justify-center items-center"></div>
      </div>
    </div>
  );
}

export default LogoHolder;