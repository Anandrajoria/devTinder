import React from 'react';

const GenderIcon = ({ gender }) => {
  if (gender?.toLowerCase() === 'male') return <span title="Male">♂️</span>;
  if (gender?.toLowerCase() === 'female') return <span title="Female">♀️</span>;
  return null;
};

const ConnectionCard = ({ user }) => {
  // Defensive check in case user is undefined
  if (!user) return null;

  const { firstName, lastName, photoUrl, age, gender, about, skills, onlineStatus } = user;
  const badgeColors = ['badge-primary', 'badge-secondary', 'badge-accent', 'badge-info'];

  return (
    <div className="card w-full max-w-sm bg-base-100/60 shadow-xl transition-all duration-300 ease-in-out hover:shadow-cyan-400/50 hover:-translate-y-2 backdrop-blur-md border border-white/10">
      <figure className="relative">
        <img src={photoUrl || 'https://via.placeholder.com/400x150'} alt="Profile background" className="h-32 w-full object-cover" />
        <div className="avatar absolute -bottom-12 left-1/2 -translate-x-1/2">
          <div className={`w-24 rounded-full ring ring-offset-base-100 ring-offset-4 ${onlineStatus === 'online' ? 'ring-success' : 'ring-gray-500'}`}>
            <img src={photoUrl || `https://ui-avatars.com/api/?name=${firstName}+${lastName}`} alt={`${firstName}'s profile`} />
          </div>
        </div>
      </figure>

      <div className="card-body items-center text-center mt-14">
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
            {skills?.slice(0, 4).map((skill, index) => (
              <div key={index} className={`badge badge-outline ${badgeColors[index % badgeColors.length]}`}>
                {skill}
              </div>
            ))}
          </div>
        </div>
        <div className="card-actions justify-center mt-6 w-full">
          <button className="btn btn-ghost btn-sm flex-1">Remove</button>
          <button className="btn btn-primary btn-sm flex-1">View Profile</button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;