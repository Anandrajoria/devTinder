import React from 'react';

const SkeletonConnectionCard = () => {
  return (
    <div className="card w-full max-w-sm bg-base-100/60 shadow-xl backdrop-blur-md border border-base-content/10 animate-pulse">
      {/* Banner */}
      <figure className="relative">
        <div className="skeleton h-32 w-full"></div>
      </figure>

      {/* Body */}
      <div className="card-body items-center text-center">
        {/* Avatar Placeholder */}
        <div className="skeleton h-24 w-24 rounded-full -mt-24 ring ring-offset-base-100 ring-offset-4 ring-gray-500"></div>
        
        {/* Text Placeholders */}
        <div className="skeleton h-7 w-40 mt-4 rounded"></div>
        <div className="skeleton h-4 w-48 mt-2 rounded"></div>
        <div className="skeleton h-3 w-full mt-4 rounded"></div>
        <div className="skeleton h-3 w-11/12 rounded"></div>
        
        {/* Skills Placeholders */}
        <div className="w-full mt-4">
          <div className="skeleton h-4 w-20 mb-3 rounded"></div>
          <div className="flex flex-wrap gap-2 justify-start">
            <div className="skeleton h-5 w-16 rounded-full"></div>
            <div className="skeleton h-5 w-20 rounded-full"></div>
            <div className="skeleton h-5 w-24 rounded-full"></div>
          </div>
        </div>
        
        {/* Button Placeholders */}
        <div className="card-actions justify-center mt-6 w-full gap-4">
          <div className="skeleton h-9 flex-1 rounded-lg"></div>
          <div className="skeleton h-9 flex-1 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonConnectionCard;