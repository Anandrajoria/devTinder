import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
const AllCaughtUp = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <div className="bg-base-200/50 backdrop-blur-lg shadow-lg rounded-2xl p-8 max-w-lg w-full text-center border border-base-300 animate-fadeIn">
        
        {/* Success Icon */}
        <div className="flex justify-center">
          <FaCheckCircle className="text-7xl text-success animate-bounceOnce drop-shadow-lg" />
        </div>

        {/* Title */}
        <h2 className="mt-6 text-3xl font-extrabold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
          You're All Caught Up!
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-base-content/70 leading-relaxed">
          There are no new users in your feed right now.
          <br /> Check back later for more awesome connections!
        </p>

        {/* Optional Button */}
        <Link to="/wip" className="mt-6 btn btn-primary btn-wide shadow-md hover:scale-105 transition-transform duration-300">
          Explore Other Features
        </Link>
      </div>
    </div>
  );
};

export default AllCaughtUp;
