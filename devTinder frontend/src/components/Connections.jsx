import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import ConnectionCard from './ConnectionCard';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
 const [loading, setLoading] = useState(true);

  // const fetchConnections = async () => {
  //   try {
  //     const res = await axios.get(BASE_URL + "/user/connection", {
  //       withCredentials: true,
  //     });
  //     dispatch(addConnection(res.data.data));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // useEffect(() => {
  //   fetchConnections();
  // }, []);

  useEffect(() => {
    const fetchConnections = async () => {
      // setLoading(true); // Technically this should be here, but keeping your logic as-is.
      try {
        const res = await axios.get(BASE_URL + "/user/connection", {
          withCredentials: true,
        });
        dispatch(addConnection(res.data.data));
      } catch (error) {
        console.error(error);
      } finally {
        // 2. Set loading to false after API call is complete
        setLoading(false);
      }
    };
    fetchConnections();
  }, []);


if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex justify-center items-center">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

 if (!connections || connections.length === 0) {
    return (
       <div className="min-h-screen w-full bg-gray-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex justify-center items-center">
          <h1 className="text-2xl text-white/70">No Connections Found</h1>
       </div>
    );
  }

  return (
    // <div className="flex justify-center my-10">
    //   <h1 className="text-bold text-2xl">Connections</h1>
    //   {connections.map((connection) => {
    //     const {firstName,lastName,photoUrl='https://randomuser.me/api/portraits/women/45.jpg',age,gender,about,skills}=connection.receiverId
    //     return (
    //       <div key={connection._id}>
    //         <img src={photoUrl} alt="photo" className="w-20 h20" />
    //       </div>
    //     );
    //   })}
    // </div>

    <div className="min-h-screen w-full bg-gray-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Your Network</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {connections.map((connection) => {
            // YOUR LOGIC - This destructuring is exactly as you provided it.
            // NOTE: This will only work if your logic is updated to pass the correct user object.
            const userProfile = connection.receiverId; 
            return <ConnectionCard key={connection._id} user={userProfile} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;



// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { BASE_URL } from "../utils/constant";
// import { useDispatch, useSelector } from "react-redux";
// import { addConnection } from "../utils/connectionSlice";
// import ConnectionCard from "./ConnectionCard"; // Re-using the card component

// const Connections = () => {
//   // Get connections from the Redux store
//   const connections = useSelector((store) => store.connections.items); // Assuming your slice stores it in `items`
//   const dispatch = useDispatch();

//   // Local state for loading and error UI
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch only if connections are not already in the store
//     if (connections.length === 0) {
//       const fetchConnections = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//           const res = await axios.get(`${BASE_URL}/user/connection`, {
//             withCredentials: true,
//           });
//           // Assuming API returns { data: [...] }
//           dispatch(addConnection(res.data.data));
//         } catch (err) {
//           console.error(err);
//           setError("Failed to load connections.");
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchConnections();
//     }
//   }, [dispatch, connections.length]); // Effect depends on these

//   // 1. Loading State
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   // 2. Error State
//   if (error) {
//     return (
//       <div role="alert" className="alert alert-error max-w-md mx-auto my-10">
//         <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//         <span>{error}</span>
//       </div>
//     );
//   }

//   // 3. No Connections State
//   if (connections.length === 0) {
//     return (
//       <div className="text-center my-20">
//         <h1 className="text-3xl font-bold">No Connections Found</h1>
//         <p className="text-base-content/70 mt-2">Start connecting with people to see them here.</p>
//       </div>
//     );
//   }

//   // 4. Display Connections
//   return (
//     <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
//       <div className="mb-8 text-center">
//         <h1 className="text-4xl font-bold">Your Connections</h1>
//         <p className="text-lg text-base-content/70 mt-2">
//           You have {connections.length} connections.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {connections.map((connection) => (
//           // The key prop is now on the ConnectionCard component
//           <ConnectionCard key={connection._id} user={connection} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Connections;


