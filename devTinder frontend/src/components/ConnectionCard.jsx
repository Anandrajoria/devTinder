// import React, { useState } from "react"; // ✅ NEW: Import useState
// import { Link } from "react-router-dom";
// import UserProfile from "./UserProfile";
// const GenderIcon = ({ gender }) => {
//   if (gender?.toLowerCase() === "male") return <span title="Male">♂️</span>;
//   if (gender?.toLowerCase() === "female") return <span title="Female">♀️</span>;
//   return null;
// };

// const ConnectionCard = ({ user }) => {
//   // ✅ NEW: STEP 1 - Add state to manage the modal's visibility
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   if (!user) return null;

//   const {
//     _id,
//     firstName,
//     lastName,
//     photoUrl,
//     age,
//     gender,
//     about,
//     skills,
//     onlineStatus,
//   } = user;

//   const badgeColors = [
//     "badge-primary",
//     "badge-secondary",
//     "badge-accent",
//     "badge-info",
//   ];
//   const parsedSkills = Array.isArray(skills)
//     ? skills
//     : skills?.split(",") || [];

//   return (
//     // ✅ NEW: We wrap the component in a React Fragment <> to allow the modal to be a sibling to the card
//     <>
//       <div className="card w-full max-w-sm bg-base-100/60 shadow-xl transition-all duration-300 ease-in-out hover:shadow-cyan-400/50 hover:-translate-y-2 backdrop-blur-md border border-base-content/10">
//         <figure className="relative">
//           <img
//             src={photoUrl || "https://placehold.co/400x150/2a323c/4d535f"}
//             alt="Profile background"
//             className="h-32 w-full object-cover"
//           />
//           {/* ✅ NEW: STEP 3 - Add onClick to open the modal and cursor-pointer for better UX */}
//           <div
//             className="avatar absolute -bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
//             onClick={() => setIsModalOpen(true)}
//           >
//             <div
//               className={`w-24 rounded-full ring ring-offset-base-100 ring-offset-4 ${
//                 onlineStatus === "online" ? "ring-success" : "ring-gray-500"
//               }`}
//             >
//               <img
//                 src={
//                   photoUrl ||
//                   `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`
//                 }
//                 alt={`${firstName}'s profile`}
//               />
//             </div>
//           </div>
//         </figure>

//         <div className="card-body items-center text-center mt-14">
//           {/* ... The rest of your card body remains the same ... */}
//           <h2 className="card-title text-2xl font-bold">{`${firstName} ${lastName}`}</h2>
//           <div className="flex items-center space-x-2 text-base-content/70">
//             <GenderIcon gender={gender} />
//             <span>{gender}</span>
//             <span className="text-xl leading-none">·</span>
//             <span>{age} years old</span>
//           </div>
//           <p className="my-4 text-base-content/80 text-sm">{about}</p>
//           <div className="w-full">
//             <h3 className="font-bold mb-3 text-left">Top Skills</h3>
//             <div className="flex flex-wrap gap-2 justify-start">
//               {parsedSkills.length > 0 ? (
//                 parsedSkills.slice(0, 4).map((skill, index) => (
//                   <div
//                     key={index}
//                     className={`badge badge-outline ${
//                       badgeColors[index % badgeColors.length]
//                     }`}
//                   >
//                     {skill.trim()}
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-sm text-base-content/60">
//                   No skills listed.
//                 </p>
//               )}
//             </div>
//           </div>
//           <div className="card-actions justify-center mt-6 w-full">
//             <button className="btn btn-ghost btn-sm flex-1">Remove</button>

//             <Link to={`/profile/${_id}`} className="btn btn-primary btn-sm flex-1">
//               View Profile
//             </Link>

//             {/* <button className="btn btn-primary btn-sm flex-1">view Profile</button> */}
//           </div>
//         </div>
//       </div>

//       {/* ✅ NEW: STEP 4 - Conditionally render the modal based on state */}
//       {isModalOpen && (
//         // The Modal Backdrop: covers the screen and closes when clicked
//         <div
//           className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
//           onClick={() => setIsModalOpen(false)}
//         >
//           {/* The Modal Content: contains the image and a close button */}
//           <div className="relative max-w-lg max-h-lg">
//             <img
//               src={
//                 photoUrl ||
//                 `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&size=512`
//               }
//               alt={`${firstName}'s profile enlarged`}
//               className="rounded-lg shadow-2xl"
//             />
//             {/* Close Button */}
//             <button
//               className="absolute top-2 right-2 btn btn-circle btn-ghost text-white text-xl"
//               onClick={() => setIsModalOpen(false)}
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ConnectionCard;




// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// const GenderIcon = ({ gender }) => {
//   if (gender?.toLowerCase() === "male") return <span title="Male">♂️</span>;
//   if (gender?.toLowerCase() === "female") return <span title="Female">♀️</span>;
//   return null;
// };

// const ConnectionCard = ({ user }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   if (!user) return null;

//   const {
//     _id,
//     firstName,
//     lastName,
//     photoUrl,
//     age,
//     gender,
//     about,
//     skills,
//     onlineStatus,
//   } = user;

//   const badgeColors = [
//     "badge-primary",
//     "badge-secondary",
//     "badge-accent",
//     "badge-info",
//   ];
//   const parsedSkills = Array.isArray(skills)
//     ? skills
//     : skills?.split(",") || [];

//   return (
//     <>
//       {/* Card */}
//       <motion.div
//         className="card w-full max-w-sm bg-base-100/50 shadow-xl backdrop-blur-xl border border-base-content/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-primary/40 hover:-translate-y-2"
//         whileHover={{ scale: 1.03 }}
//       >
//         {/* Banner */}
//         <figure className="relative">
//           <img
//             src={photoUrl || "https://placehold.co/400x150/2a323c/4d535f"}
//             alt="Profile banner"
//             className="h-32 w-full object-cover"
//           />

//           {/* Avatar */}
//           <motion.div
//             className="avatar absolute -bottom-12 left-1/2 -translate-x-1/2 cursor-pointer group"
//             onClick={() => setIsModalOpen(true)}
//             whileHover={{ scale: 1.05 }}
//           >
//             <div
//               className={`w-24 rounded-full ring ring-offset-base-100 ring-offset-4 shadow-lg transition-all ${
//                 onlineStatus === "online" ? "ring-success" : "ring-gray-500"
//               }`}
//             >
//               <img
//                 src={
//                   photoUrl ||
//                   `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`
//                 }
//                 alt={`${firstName}'s profile`}
//               />
//             </div>
//           </motion.div>
//         </figure>

//         {/* Body */}
//         <div className="card-body items-center text-center mt-14">
//           {/* Name */}
//           <h2 className="card-title text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//             {`${firstName} ${lastName}`}
//           </h2>

//           {/* Details */}
//           <div className="flex items-center space-x-2 text-base-content/70">
//             <GenderIcon gender={gender} />
//             <span>{gender}</span>
//             <span className="text-xl leading-none">·</span>
//             <span>{age} years old</span>
//           </div>

//           {/* About */}
//           <p className="my-4 text-base-content/80 text-sm italic">{about}</p>

//           {/* Skills */}
//           <div className="w-full">
//             <h3 className="font-bold mb-3 text-left">Top Skills</h3>
//             <div className="flex flex-wrap gap-2 justify-start">
//               {parsedSkills.length > 0 ? (
//                 parsedSkills.slice(0, 4).map((skill, index) => (
//                   <span
//                     key={index}
//                     className={`badge badge-outline ${badgeColors[index % badgeColors.length]} shadow-sm hover:scale-105 transition-transform`}
//                   >
//                     {skill.trim()}
//                   </span>
//                 ))
//               ) : (
//                 <p className="text-sm text-base-content/60">
//                   No skills listed.
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="card-actions justify-center mt-6 w-full">
//             <button className="btn btn-ghost btn-sm flex-1 hover:scale-105 transition-transform">
//               Remove
//             </button>
//             <Link
//               to={`/profile/${_id}`}
//               className="btn btn-primary btn-sm flex-1 hover:scale-105 transition-transform"
//             >
//               View Profile
//             </Link>
//           </div>
//         </div>
//       </motion.div>

//       {/* Modal */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <motion.div
//             className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
//             onClick={() => setIsModalOpen(false)}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="relative max-w-lg max-h-lg p-4"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.8 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <img
//                 src={
//                   photoUrl ||
//                   `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&size=512`
//                 }
//                 alt={`${firstName}'s profile enlarged`}
//                 className="rounded-lg shadow-2xl"
//               />
//               <button
//                 className="absolute top-2 right-2 btn btn-circle btn-ghost text-white text-xl hover:bg-red-500"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 ✕
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default ConnectionCard;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../utils/constant"; // Make sure this path is correct
import { useDispatch } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
/**
 * A small helper component to display a gender icon.
 */
const GenderIcon = ({ gender }) => {
  if (gender?.toLowerCase() === "male") return <span title="Male">♂️</span>;
  if (gender?.toLowerCase() === "female") return <span title="Female">♀️</span>;
  return null;
};

/**
 * A card component to display a user's connection details.
 * @param {object} user - The user object for the connection.
 * @param {function} onRemove - A callback function to be executed when a connection is successfully removed.
 */
const ConnectionCard = ({ user, onRemove }) => {
   const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

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

  /**
   * Handles the API call to remove a connection.
   */
   const handleRemove = async () => {
    try {
      // 1️⃣ Call backend API
      await axios.post(
        `${BASE_URL}/remove/${user._id}`, // adjust path if needed
        {},
        { withCredentials: true }
      );

      // 2️⃣ Update parent/UI instantly
      if (onRemove) {
        onRemove(user._id);
      }
    } catch (error) {
      console.error("Failed to remove connection:", error);
    }
  };

  return (
    <>
      {/* Card */}
      <motion.div
        className="card w-full max-w-sm bg-base-100/50 shadow-xl backdrop-blur-xl border border-base-content/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-primary/40 hover:-translate-y-2"
        whileHover={{ scale: 1.03 }}
        layout
        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
      >
        {/* Banner and Avatar section */}
        <figure className="relative">
          <img
            src={photoUrl || "https://placehold.co/400x150/2a323c/4d535f"}
            alt="Profile banner"
            className="h-32 w-full object-cover"
          />

          {/* Avatar */}
          <motion.div
            className="avatar absolute -bottom-12 left-1/2 -translate-x-1/2 cursor-pointer group"
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
          >
            <div
              className={`w-24 rounded-full ring ring-offset-base-100 ring-offset-4 shadow-lg transition-all ${
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
          </motion.div>
        </figure>

        {/* Card Body */}
        <div className="card-body items-center text-center mt-14">
          <h2 className="card-title text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {`${firstName} ${lastName}`}
          </h2>

          <div className="flex items-center space-x-2 text-base-content/70">
            <GenderIcon gender={gender} />
            <span>{gender}</span>
            <span className="text-xl leading-none">·</span>
            <span>{age} years old</span>
          </div>

          <p className="my-4 text-base-content/80 text-sm italic">{about}</p>

          <div className="w-full">
            <h3 className="font-bold mb-3 text-left">Top Skills</h3>
            <div className="flex flex-wrap gap-2 justify-start">
              {parsedSkills.length > 0 ? (
                parsedSkills.slice(0, 4).map((skill, index) => (
                  <span
                    key={index}
                    className={`badge badge-outline ${
                      badgeColors[index % badgeColors.length]
                    } shadow-sm hover:scale-105 transition-transform`}
                  >
                    {skill.trim()}
                  </span>
                ))
              ) : (
                <p className="text-sm text-base-content/60">
                  No skills listed.
                </p>
              )}
            </div>
          </div>

          {/* Card Actions */}
          <div className="card-actions justify-center mt-6 w-full">
            <button
              className="btn btn-ghost btn-sm flex-1 hover:scale-105 transition-transform"
              onClick={handleRemove}
              disabled={isRemoving}
            >
              {isRemoving ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Remove"
              )}
            </button>
            <Link
              to={`/profile/${_id}`}
              className="btn btn-primary btn-sm flex-1 hover:scale-105 transition-transform"
            >
              View Profile
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Modal for viewing avatar */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            onClick={() => setIsModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-lg max-h-lg p-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={
                  photoUrl ||
                  `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&size=512`
                }
                alt={`${firstName}'s profile enlarged`}
                className="rounded-lg shadow-2xl"
              />
              <button
                className="absolute top-2 right-2 btn btn-circle btn-ghost text-white text-xl hover:bg-red-500"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ConnectionCard;