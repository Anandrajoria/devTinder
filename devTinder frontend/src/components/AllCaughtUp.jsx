import { FaCheckCircle } from "react-icons/fa";

/**
 * A presentational component that displays an "empty state" message
 * when a user has viewed all available profiles in their feed.
 */
const AllCaughtUp = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full text-base-content">
      <FaCheckCircle className="text-7xl text-success" />
      <h2 className="mt-6 text-3xl font-bold">You're All Caught Up!</h2>
      <p className="mt-2 text-base-content/70">
        There are no new users in your feed right now. Check back later!
      </p>
    </div>
  );
};

export default AllCaughtUp;