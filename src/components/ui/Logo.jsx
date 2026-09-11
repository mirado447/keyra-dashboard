import logoImage from "../../assets/logo-keyra.png";

function Logo({ size = "md" }) {
  const containerSizes = {
    sm: "w-10 h-10 p-1.5",
    md: "w-12 h-12 p-1.5",
  };

  return (
    <div className={`${containerSizes[size]} rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/40`}>
      <img src={logoImage} alt="" className="w-full h-full object-contain" />
    </div>
  );
}

export default Logo;