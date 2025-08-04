import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { BASE_URL } from "../utils/constant";
import { FaUserPlus, FaUserTimes, FaUsersSlash } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";

// SkeletonCard component remains the same...
const SkeletonCard = () => (
    <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
            <div className="flex animate-pulse items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-1 flex-col gap-3">
                    <div className="skeleton h-4 w-3/4 rounded"></div>
                    <div className="skeleton h-3 w-1/2 rounded"></div>
                </div>
            </div>
            <div className="card-actions mt-4 justify-end">
                <div className="skeleton h-10 w-24 rounded-lg"></div>
                <div className="skeleton h-10 w-24 rounded-lg"></div>
            </div>
        </div>
    </div>
);

// ============================================================================
// Main Requests Component
// ============================================================================
const Requests = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingId, setProcessingId] = useState(null);
    const receivedRequests = useSelector((state) => state.requests);

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                const res = await axios.get(`${BASE_URL}/user/requests/received`, {
                    withCredentials: true,
                });
                if (res.data?.data) {
                    dispatch(addRequests(res.data.data));
                }
            } catch (err) {
                console.error("Failed to fetch requests:", err);
                setError("Could not load requests. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [dispatch]);

    const handleRequestResponse = async (requestId, status) => {
        setProcessingId(requestId);
        try {
            await axios.patch(
                `${BASE_URL}/request/respond/${requestId}`,
                { status },
                { withCredentials: true }
            );
            dispatch(removeRequest(requestId));
        } catch (err) {
            console.error(`Failed to ${status} request`, err);
        } finally {
            setProcessingId(null);
        }
    };

    // ============================================================================
    // FIXED RENDERCONTENT FUNCTION
    // ============================================================================
    const renderContent = () => {
        // Re-added the missing loading state
        if (isLoading) {
            return (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
            );
        }

        // Re-added the missing error state
        if (error) {
            return (
                <div role="alert" className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{error}</span>
                </div>
            );
        }

        // Re-added the missing empty state
        if (receivedRequests.length === 0) {
            return (
                <div className="text-center text-base-content/60 py-20">
                    <FaUsersSlash className="mx-auto h-20 w-20" />
                    <h3 className="mt-4 text-2xl font-semibold">No New Requests</h3>
                    <p className="mt-2 text-sm">You're all caught up!</p>
                </div>
            );
        }

        // This is the correct JSX block, now properly returned
        return (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {receivedRequests.map((request) => {
                    const { senderId: user } = request;
                    const isProcessing = processingId === request._id;

                    return (
                        <div key={request._id} className="card bg-base-100 shadow-xl transition-all duration-300 hover:shadow-2xl">
                            <div className="card-body">
                                <div className="flex items-center gap-4">
                                    <div className="avatar">
                                        <div className="w-16 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                                            <img src={user.photoUrl} alt={`${user.firstName}'s profile`} />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="card-title">{user.firstName} {user.lastName}</h2>
                                        <span className="text-sm text-base-content/70">{user.age}, {user.gender}</span>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-base-content/80">{user.about}</p>
                                <div className="card-actions mt-4 justify-end">
                                    <button
                                        onClick={() => handleRequestResponse(request._id, 'rejected')}
                                        className="btn btn-ghost"
                                        disabled={isProcessing}
                                    >
                                        Decline
                                    </button>
                                    <button
                                        onClick={() => handleRequestResponse(request._id, 'accepted')}
                                        className="btn btn-primary"
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? (
                                            <CgSpinner className="animate-spin text-xl" />
                                        ) : (
                                            <FaUserPlus className="mr-2" />
                                        )}
                                        Accept
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-base-200 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-8 text-4xl font-bold tracking-tight text-base-content">
                    Connection Requests
                </h1>
                {renderContent()}
            </div>
        </div>
    );
};

export default Requests;