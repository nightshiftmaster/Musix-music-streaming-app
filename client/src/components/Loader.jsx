import { loader } from "../assets";

const Loader = ({ title }) =>
  title ? (
    <div className="h-screen pb-80 flex justify-center items-center flex-col">
      <img src={loader} alt="loader" className="w-32 h-32 object-contain" />
      <h1 className="font-bold text-2xl text-white">{title || "Loading"}</h1>
    </div>
  ) : null;

export default Loader;
