// // src/components/UserProfile.jsx

// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import { BASE_URL } from "../utils/constant";
// import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa'; // Example icons

// const UserProfile = () => {
//   // useParams hook gets the dynamic part of the URL, in this case, the :userId
//   const { userId } = useParams();

//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     // Define the async function to fetch data
//     const fetchUserProfile = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${BASE_URL}/profile/${userId}`, {
//           withCredentials: true, // Needed because it's a protected route
//         });
//         setProfile(res.data);
//       } catch (err) {
//         console.error("Failed to fetch profile:", err);
//         setError(err.response?.data?.message || "Failed to load profile.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, [userId]); // Re-run the effect if the userId in the URL changes

//   // Display a loading spinner while data is being fetched
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <span className="loading loading-infinity loading-lg text-primary"></span>
//       </div>
//     );
//   }

  
//   if (error) {
//     return (
//       <div className="flex flex-col justify-center items-center h-screen text-center">
//         <h2 className="text-2xl font-bold text-error">Oops!</h2>
//         <p className="text-base-content/70 mt-2">{error}</p>
//         <Link to="/feed" className="btn btn-primary mt-4">Go to Feed</Link>
//       </div>
//     );
//   }

//   // Render the profile data
//   return (
//     <div className="min-h-screen bg-base-200 p-4 sm:p-8">
//       <div className="max-w-4xl mx-auto bg-base-100 rounded-lg shadow-xl p-8">
        
//         {/* Profile Header */}
//         <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8">
//           <div className="avatar">
//             <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
//               <img src={profile.photoUrl || `https://ui-avatars.com/api/?name=${profile.firstName}+${profile.lastName}`} alt="Profile" />
//             </div>
//           </div>
//           <div className="text-center sm:text-left">
//             <h1 className="text-4xl font-bold">{`${profile.firstName} ${profile.lastName}`}</h1>
//             <p className="text-lg text-base-content/70 mt-1">{profile.headline || "Developer | Open to new opportunities"}</p>
//             <div className="flex justify-center sm:justify-start space-x-4 mt-4 text-2xl">
//               {/* Add social links here if you have them in your schema */}
//               <a href="#" className="text-base-content/70 hover:text-primary"><FaGithub /></a>
//               <a href="#" className="text-base-content/70 hover:text-primary"><FaLinkedin /></a>
//               <a href="#" className="text-base-content/70 hover:text-primary"><FaGlobe /></a>
//             </div>
//           </div>
//         </div>

//         {/* About Section */}
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold border-b-2 border-primary pb-2">About</h2>
//           <p className="mt-4 text-base-content/90 whitespace-pre-wrap">{profile.about || "No bio provided."}</p>
//         </div>

//         {/* Skills Section */}
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold border-b-2 border-primary pb-2">Skills</h2>
//           <div className="flex flex-wrap gap-2 mt-4">
//             {(profile.skills && profile.skills.length > 0) ? (
//               profile.skills.map((skill, index) => (
//                 <div key={index} className="badge badge-lg badge-outline badge-secondary">{skill}</div>
//               ))
//             ) : (
//               <p className="text-base-content/70">No skills listed.</p>
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default UserProfile;


import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { motion, useInView } from "framer-motion";
import { FaGithub, FaLinkedin, FaGlobe, FaCode } from 'react-icons/fa';

// A reusable section component with scroll-triggered animations
const ProfileSection = ({ title, children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mt-16"
    >
      <h2 className="text-3xl font-bold border-b-2 border-primary/50 pb-3 mb-6">{title}</h2>
      {children}
    </motion.div>
  );
};

const UserProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/profile/${userId}`, {
          withCredentials: true,
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError(err.response?.data?.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-200">
        <span className="loading loading-infinity loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center bg-base-200">
        <h2 className="text-2xl font-bold text-error">Oops! Profile Not Found</h2>
        <p className="text-base-content/70 mt-2">{error}</p>
        <Link to="/feed" className="btn btn-primary mt-4">Go to Feed</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 text-base-content overflow-hidden">
     
      <div className="max-w-6xl mx-auto p-4 sm:p-8 relative">
        {/* --- Profile Header --- */}
        <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-8 bg-base-100/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-base-content/10"
        >
          <div className="avatar">
            <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
              <img src={profile.photoUrl || `https://ui-avatars.com/api/?name=${profile.firstName}+${profile.lastName}`} alt="Profile" />
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-5xl font-extrabold">{`${profile.firstName} ${profile.lastName}`}</h1>
            <p className="text-xl text-base-content/70 mt-2">{profile.headline || "Developer | Open to new opportunities"}</p>
            <div className="flex justify-center sm:justify-start space-x-4 mt-4 text-2xl">
              <Link to="/work-in-progress" className="text-base-content/70 hover:text-primary transition-colors"><FaGithub /></Link>
              <Link to="/work-in-progress" className="text-base-content/70 hover:text-primary transition-colors"><FaLinkedin /></Link>
              <Link to="/work-in-progress" className="text-base-content/70 hover:text-primary transition-colors"><FaGlobe /></Link>
            </div>
          </div>
        </motion.div>

        {/* --- Main Content --- */}
        <ProfileSection title="About">
          <p className="text-lg text-base-content/80 whitespace-pre-wrap leading-relaxed">
            {profile.about || "No bio provided."}
          </p>
        </ProfileSection>

        <ProfileSection title="Skills">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(profile.skills && profile.skills.length > 0) ? (
              profile.skills.map((skill) => (
                <div key={skill} className="bg-base-100/50 p-4 rounded-lg text-center font-semibold border border-base-content/10">
                  {skill}
                </div>
              ))
            ) : (
              <p className="text-base-content/70 col-span-full">No skills listed.</p>
            )}
          </div>
        </ProfileSection>
        
        {/* Placeholder for a future "Projects" section */}
        <ProfileSection title="Projects">
            <p className="text-base-content/70">This user hasn't added any projects yet.</p>
            {/* You could map over project cards here in the future */}
        </ProfileSection>
      </div>
    </div>
  );
};

export default UserProfile;