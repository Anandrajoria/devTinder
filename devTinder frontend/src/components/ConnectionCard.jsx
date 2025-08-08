import React, { useState } from "react"; // ✅ NEW: Import useState
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";
const GenderIcon = ({ gender }) => {
  if (gender?.toLowerCase() === "male") return <span title="Male">♂️</span>;
  if (gender?.toLowerCase() === "female") return <span title="Female">♀️</span>;
  return null;
};

const ConnectionCard = ({ user }) => {
  // ✅ NEW: STEP 1 - Add state to manage the modal's visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) return null;

  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    skills,
    onlineStatus,
  } = user;

  const badgeColors = [
    "badge-primary",
    "badge-secondary",
    "badge-accent",
    "badge-info",
  ];
  const parsedSkills = Array.isArray(skills)
    ? skills
    : skills?.split(",") || [];

  return (
    // ✅ NEW: We wrap the component in a React Fragment <> to allow the modal to be a sibling to the card
    <>
      <div className="card w-full max-w-sm bg-base-100/60 shadow-xl transition-all duration-300 ease-in-out hover:shadow-cyan-400/50 hover:-translate-y-2 backdrop-blur-md border border-base-content/10">
        <figure className="relative">
          <img
            src={photoUrl || "https://placehold.co/400x150/2a323c/4d535f"}
            alt="Profile background"
            className="h-32 w-full object-cover"
          />
          {/* ✅ NEW: STEP 3 - Add onClick to open the modal and cursor-pointer for better UX */}
          <div
            className="avatar absolute -bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <div
              className={`w-24 rounded-full ring ring-offset-base-100 ring-offset-4 ${
                onlineStatus === "online" ? "ring-success" : "ring-gray-500"
              }`}
            >
              <img
                src={
                  photoUrl ||
                  `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`
                }
                alt={`${firstName}'s profile`}
              />
            </div>
          </div>
        </figure>

        <div className="card-body items-center text-center mt-14">
          {/* ... The rest of your card body remains the same ... */}
          <h2 className="card-title text-2xl font-bold">{`${firstName} ${lastName}`}</h2>
          <div className="flex items-center space-x-2 text-base-content/70">
            <GenderIcon gender={gender} />
            <span>{gender}</span>
            <span className="text-xl leading-none">·</span>
            <span>{age} years old</span>
          </div>
          <p className="my-4 text-base-content/80 text-sm">{about}</p>
          <div className="w-full">
            <h3 className="font-bold mb-3 text-left">Top Skills</h3>
            <div className="flex flex-wrap gap-2 justify-start">
              {parsedSkills.length > 0 ? (
                parsedSkills.slice(0, 4).map((skill, index) => (
                  <div
                    key={index}
                    className={`badge badge-outline ${
                      badgeColors[index % badgeColors.length]
                    }`}
                  >
                    {skill.trim()}
                  </div>
                ))
              ) : (
                <p className="text-sm text-base-content/60">
                  No skills listed.
                </p>
              )}
            </div>
          </div>
          <div className="card-actions justify-center mt-6 w-full">
            <button className="btn btn-ghost btn-sm flex-1">Remove</button>

            <Link to={`/profile/${_id}`} className="btn btn-primary btn-sm flex-1">
              View Profile
            </Link>

            {/* <button className="btn btn-primary btn-sm flex-1">view Profile</button> */}
          </div>
        </div>
      </div>

      {/* ✅ NEW: STEP 4 - Conditionally render the modal based on state */}
      {isModalOpen && (
        // The Modal Backdrop: covers the screen and closes when clicked
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          {/* The Modal Content: contains the image and a close button */}
          <div className="relative max-w-lg max-h-lg">
            <img
              src={
                photoUrl ||
                `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&size=512`
              }
              alt={`${firstName}'s profile enlarged`}
              className="rounded-lg shadow-2xl"
            />
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 btn btn-circle btn-ghost text-white text-xl"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ConnectionCard;
