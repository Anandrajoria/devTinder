import axios from "axios";

import { BASE_URL } from "../utils/constant";

import { useDispatch } from "react-redux";

import { removeUserFromFeed } from "../utils/feedSlice";

import { useState } from "react";

import { CgSpinner } from "react-icons/cg";

const FALLBACK_IMAGE_URL =
  "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";

const UserCard = ({ user, isLoggedIn }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  if (!user) return null;

  const {
    _id,

    firstName,

    lastName,

    photoUrl,

    age,

    gender,

    about,

    skills = [],
  } = user;

  const handleSendRequest = async (status, userId) => {
    setIsLoading(true);

    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,

        {},

        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error("API Error:", error?.response?.data || error.message);

      setIsLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl border border-base-content/10">
      {" "}
      <figure>
        {" "}
        <img
          src={photoUrl || FALLBACK_IMAGE_URL}
          alt={`${firstName} ${lastName}`}
          className="h-64 w-full object-cover"
        />{" "}
      </figure>{" "}
      <div className="card-body">
        {" "}
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>{" "}
        {(age || gender) && (
          <p className="text-sm text-base-content/60">
            {age} {gender}
          </p>
        )}
        {about && <p className="my-2 text-base-content/80">{about}</p>}{" "}
        {Array.isArray(skills) && skills.length > 0 && (
          <div className="flex flex-wrap gap-2 my-2">
            {" "}
            {skills.map((skill, index) => (
              <div key={index} className="badge badge-outline">
                {skill}{" "}
              </div>
            ))}{" "}
          </div>
        )}{" "}
        {isLoggedIn && (
          <div className="card-actions justify-center mt-4">
            {" "}
            <button
              className="btn btn-outline btn-error"
              disabled={isLoading}
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore{" "}
            </button>{" "}
            <button
              className="btn btn-primary"
              disabled={isLoading}
              onClick={() => handleSendRequest("interested", _id)}
            >
              {" "}
              {isLoading ? (
                <CgSpinner className="animate-spin text-xl" />
              ) : (
                "Interested"
              )}{" "}
            </button>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
};

export default UserCard;
