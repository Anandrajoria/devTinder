// import React, { useState , useEffect} from "react";
// const profileImages = [
//   "https://randomuser.me/api/portraits/women/44.jpg",
//   "https://randomuser.me/api/portraits/men/32.jpg",
//   "https://randomuser.me/api/portraits/women/68.jpg",
//   "https://randomuser.me/api/portraits/men/45.jpg",
//   "https://randomuser.me/api/portraits/women/65.jpg",
//   "https://randomuser.me/api/portraits/men/41.jpg",
//   "https://randomuser.me/api/portraits/women/43.jpg",
//   "https://randomuser.me/api/portraits/men/36.jpg",
//   "https://randomuser.me/api/portraits/women/50.jpg",
//   "https://randomuser.me/api/portraits/men/51.jpg",
//   "https://randomuser.me/api/portraits/women/52.jpg",
//   "https://randomuser.me/api/portraits/men/53.jpg",
// ];

// export default function LandingPage() {
//   const [showConsent, setShowConsent] = useState(true);

//   return (
//     <div className="relative min-h-screen bg-neutral overflow-hidden">
//       {/* Background grid of profile images */}
//       <div className="absolute inset-0 z-0">
//         <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 opacity-60 blur-sm">
//           {profileImages.concat(profileImages).map((img, i) => (
//             <div
//               key={i}
//               className="rounded-2xl overflow-hidden border-2 border-base-200 shadow-lg"
//             >
//               <img
//                 src={img}
//                 alt="profile"
//                 className="object-cover w-full h-40"
//               />
//             </div>
//           ))}
//         </div>
//         <div className="absolute inset-0 bg-black bg-opacity-60"></div>
//       </div>

//       {/* Hero Section */}
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
//         <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg mt-32 mb-8 animate-fade-up">
//           Start something epic.
//         </h1>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-up animate-delay-200">
//           {appStoreBtn}
//           {googlePlayBtn}
//         </div>
//       </div>

//       {/* Cookie Consent Bar */}
//
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// --- Constants for the page ---
const profileImages = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/45.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
  "https://randomuser.me/api/portraits/men/41.jpg",
  "https://randomuser.me/api/portraits/women/43.jpg",
  "https://randomuser.me/api/portraits/men/36.jpg",
  "https://randomuser.me/api/portraits/women/50.jpg",
  "https://randomuser.me/api/portraits/men/51.jpg",
  "https://randomuser.me/api/portraits/women/52.jpg",
  "https://randomuser.me/api/portraits/men/53.jpg",
];

// --- Configuration for the typing animation ---
const textLines = [
  "Commit to more than just code.",
  "Connecting you beyond localhost:3000",
  "Find a connection without the merge conflicts.",
  "Your next great collaboration is just a swipe away.",
  "More than just pair programming.",
];
const typingSpeed = 100;
const erasingSpeed = 50;
const newLineDelay = 2000;

export default function LandingPage() {
  // const [showConsent, setShowConsent] = useState(true);

  // --- Typing Animation State and Logic ---
  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentLine = textLines[lineIndex];

      if (isErasing) {
        if (charIndex > 0) {
          setText(currentLine.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsErasing(false);
          setLineIndex((prevIndex) => (prevIndex + 1) % textLines.length);
        }
      } else {
        if (charIndex < currentLine.length) {
          setText(currentLine.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Pause at the end of the line before erasing
          setTimeout(() => setIsErasing(true), newLineDelay);
        }
      }
    };

    const speed = isErasing ? erasingSpeed : typingSpeed;
    const timeout = setTimeout(handleTyping, speed);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timeout);
  }, [text, isErasing, charIndex, lineIndex]);

  return (
    // Set a theme on your root html tag for daisyUI, e.g., <html data-theme="dracula">
    <div className="relative min-h-screen bg-neutral overflow-hidden">
      {/* Background grid of profile images */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 opacity-60 blur-sm">
          {profileImages.concat(profileImages).map((img, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden border-2 border-base-200 shadow-lg"
            >
              <img
                src={img}
                alt="profile"
                className="object-cover w-full h-40"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* --- Updated Hero Section with Typing Animation --- */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="font-semibold text-2xl sm:text-4xl md:text-5xl min-h-[120px] md:min-h-[80px] text-base-content animate-fade-in drop-shadow-lg">
          <span>{text}</span>
          <span className="inline-block w-[3px] h-8 md:h-12 bg-accent align-bottom animate-blink"></span>
        </h1>
        <div className="mt-8 animate-fade-up animate-delay-500">
          <button className="btn btn-soft">create profile</button> or
          <Link
            to="/login"
            className="btn btn-neutral btn-outline text-base-content"
          >
            sign in
          </Link>
        </div>
      </div>

      {/* Cookie Consent Bar */}
      {/* {showConsent && (
        <div className="fixed bottom-0 left-0 w-full bg-base-200 bg-opacity-90 p-4 flex flex-col md:flex-row items-center justify-between z-50 gap-2 animate-fade-up">
          <span className="text-sm text-base-content">
            We use cookies to enhance your experience.{" "}
            <a href="#" className="underline">
              Learn more
            </a>
            .
          </span>
          <div className="flex gap-2 mt-2 md:mt-0">
            <button
              className="btn btn-primary"
              onClick={() => setShowConsent(false)}
            >
              I accept
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => setShowConsent(false)}
            >
              I decline
            </button>
          </div>
        </div>
      )} */}

      {/* {showConsent && (
        <div className="fixed bottom-0 left-0 w-full bg-base-200 bg-opacity-90 p-4 flex flex-col md:flex-row items-center justify-between z-50 gap-2 animate-fade-up">
          <span className="text-sm text-base-content">
            We value your privacy. We and our partners use trackers to measure
            the audience of our website and to provide you with offers and
            improve our own DevTinder marketing operations.{" "}
            <a href="#" className="underline">
              More info on cookies and providers we use
            </a>
            . You can withdraw your consent at any time in your settings.
          </span>
          <div className="flex gap-2 mt-2 md:mt-0">
            <button
              className="btn btn-outline"
              onClick={() => setShowConsent(false)}
            >
              Personalize my choices
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setShowConsent(false)}
            >
              I accept
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => setShowConsent(false)}
            >
              I decline
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}
