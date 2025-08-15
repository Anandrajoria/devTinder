// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { BASE_URL } from "../utils/constant";
// import { useDispatch, useSelector } from "react-redux";
// import { addConnection } from "../utils/connectionSlice";
// import ConnectionCard from "./ConnectionCard";
// import SkeletonConnectionCard from "./SkeletonConnectionCard";

// const Connections = () => {
//   const connections = useSelector((store) => store.connections);
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchConnections = async () => {
//       // setLoading(true); // Technically this should be here, but keeping your logic as-is.
//       try {
//         const res = await axios.get(BASE_URL + "/user/connection", {
//           withCredentials: true,
//         });
//         dispatch(addConnection(res.data.data));
//       } catch (error) {
//         console.error(error);
//       } finally {
//         // 2. Set loading to false after API call is complete
//         setLoading(false);
//       }
//     };
//     setTimeout(fetchConnections,500);
//   }, [dispatch]);

//   if (loading) {
//     return (
//       <div className="min-h-screen w-full bg-gray-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex justify-center items-center">
//         <span className="loading loading-dots loading-lg text-primary"></span>
//       </div>
//     );
//   }

//   if (!connections || connections.length === 0) {
//     return (
//       <div className="min-h-screen w-full bg-gray-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex justify-center items-center">
//         <h1 className="text-2xl text-white/70">No Connections Found</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full bg-base-200 p-4 sm:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl sm:text-5xl font-bold text-base-content">
//             Your Network
//           </h1>
//           <p className="text-lg text-base-content/70 mt-2">
//             Explore and connect with professionals in your circle.
//           </p>
//         </div>
//        {loading ? (
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//     {[...Array(6)].map((_, i) => <SkeletonConnectionCard key={i} />)}
//   </div>
// ) : (
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//     {connections.map((connection) => {
//       const userProfile = connection.receiverId;
//       return <ConnectionCard key={connection._id} user={userProfile} />;
//     })}
//   </div>
// )}

//       </div>
//     </div>
//   );
// };

// export default Connections;






import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addConnection } from "../utils/connectionSlice";
import ConnectionCard from "./ConnectionCard";
import SkeletonConnectionCard from "./SkeletonConnectionCard";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const currentUser = useSelector((store) => store.user); // ✅ logged-in user info
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [showSkeletons, setShowSkeletons] = useState(false);

  // const handleRemoveFromList = (removedUserId) => {
  //   const updatedConnections = connections.filter((connection) => {
  //     const otherUser =
  //       connection.fromUserId._id === removedUserId
  //         ? connection.fromUserId
  //         : connection.toUserId;
  //     return otherUser._id !== removedUserId;
  //   });
  //   dispatch(addConnection(updatedConnections));
  // };

  const handleRemoveFromList = (removedUserId) => {
  const updatedConnections = connections.filter((connection) => {
    const otherUserId =
      connection.senderId._id === currentUser._id
        ? connection.receiverId._id
        : connection.senderId._id;
    return otherUserId !== removedUserId;
  });

  dispatch(addConnection(updatedConnections));
};


  useEffect(() => {
    const skeletonTimer = setTimeout(() => {
      setShowSkeletons(true);
    }, 500);

    const fetchConnections = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/connection", {
          withCredentials: true,
        });
        dispatch(addConnection(res.data.data));
      } catch (error) {
        console.error("Error fetching connections:", error);
      } finally {
        setLoading(false);
        clearTimeout(skeletonTimer);
      }
    };

    // Optional simulated delay
    setTimeout(fetchConnections, 500);

    return () => clearTimeout(skeletonTimer);
  }, [dispatch]);

  // 🔵 Stage 1: Full-screen loading spinner
  if (loading && !showSkeletons) {
    return (
      <div className="min-h-screen w-full bg-gray-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex justify-center items-center">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  // 🔴 No connections found
  if (!loading && (!connections || connections.length === 0)) {
    return (
      <div className="min-h-screen w-full bg-gray-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex justify-center items-center">
        <h1 className="text-2xl text-white/70">No Connections Found</h1>
      </div>
    );
  }

  // 🟢 Helper to get the other person in the connection
  const getOtherUser = (connection) => {
    if (!currentUser || !connection.senderId || !connection.receiverId)
      return null;
    return connection.senderId._id === currentUser._id
      ? connection.receiverId
      : connection.senderId;
  };

  
  return (
    <div className="min-h-screen w-full bg-base-200 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-base-content">
            Your Network
          </h1>
          <p className="text-lg text-base-content/70 mt-2">
            Explore and connect with professionals in your circle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading && showSkeletons
            ? [...Array(6)].map((_, i) => <SkeletonConnectionCard key={i} />)
            : connections.map((connection) => {
                const userProfile = getOtherUser(connection);
                return (
                  <ConnectionCard key={connection._id} user={userProfile}  onRemove={handleRemoveFromList}/>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Connections;


