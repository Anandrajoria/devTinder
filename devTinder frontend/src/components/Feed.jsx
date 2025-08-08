import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setFeed, appendFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import AllCaughtUp from "./AllCaughtUp"; // Assuming you want the aesthetic message back
import { AnimatePresence } from "framer-motion";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  // We still get the user to decide if action buttons should be shown, but it's not needed for fetching
  const user = useSelector((store) => store.user?.profile);

  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'succeeded' | 'failed'
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchFeedPage = async (currentPage) => {
    if (status === "loading" || (status === "fetchingMore" && currentPage > 1))
      return;

    setStatus(currentPage === 1 ? "loading" : "fetchingMore");

    try {
      const res = await axios.get(
        `${BASE_URL}/feed?page=${currentPage}&limit=10`,
        {
          // This will send credentials ONLY IF the user is logged in
          withCredentials: true,
        }
      );

      const { data, totalPages } = res.data;

      if (data && data.length > 0) {
        if (currentPage === 1) {
          dispatch(setFeed(data));
        } else {
          dispatch(appendFeed(data));
        }
      }

      setPage(currentPage);
      setHasMore(currentPage < totalPages);
      setStatus("succeeded");
    } catch (err) {
      console.error("Error fetching feed:", err);
      setStatus("failed");
    }
  };

  // The useEffect no longer waits for a user. It runs once on mount.
  useEffect(() => {
    fetchFeedPage(1);
  }, [dispatch]);

  // Pre-fetching logic remains the same and is safe
  useEffect(() => {
    if (status === "succeeded" && feed.length <= 3 && hasMore) {
      fetchFeedPage(page + 1);
    }
  }, [feed.length, status, hasMore, page, dispatch]);

  const currentUser = feed && feed.length > 0 ? feed[0] : null;

  // --- Render Logic ---

  if (status === "loading" || status === "idle") {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-infinity loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)] w-full bg-base-200">
      <AnimatePresence mode="wait">
        {currentUser ? (
          // Pass the logged-in status to UserCard
          <UserCard
            key={currentUser._id}
            user={currentUser}
            isLoggedIn={!user}
          />
        ) : (
          <AllCaughtUp />
        )}
      </AnimatePresence>
    </div>
  );
};
export default Feed;
