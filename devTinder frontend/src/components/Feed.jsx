import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (feed === null) {
      getFeed();
    }
  }, [feed]);

  if (feed === null) {
    return <span className="loading loading-infinity loading-xl"></span>;
  }

  if (!feed)
    return <span className="loading loading-infinity loading-xl"></span>;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;

  return (
    feed && (
      <div className="flex justify-center my-10">
        {feed[0] ? <UserCard user={feed[0]} /> : <p>No user data available</p>}
      </div>
    )
  );
};
export default Feed;
