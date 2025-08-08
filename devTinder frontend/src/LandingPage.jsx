import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaCode, FaSignInAlt } from "react-icons/fa";
import { useInView } from "framer-motion";
import UserCard from "./components/UserCard";

// Configuration for the typing animation
const textLines = [
  "Commit to more than just code.",
  "Connecting you beyond localhost:3000.",
  "Find a connection without merge conflicts.",
  "Your next great collaboration is a swipe away.",
];

// A component for the animated grid background
const GridBackground = () => (
  <div className="absolute inset-0 z-0 h-full w-full bg-base-100">
    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
  </div>
);

// A component for the cursor spotlight effect
const CursorAura = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition duration-300"
      style={{
        background:
          "radial-gradient(600px at var(--mouse-x) var(--mouse-y), rgba(29, 78, 216, 0.15), transparent 80%)",
      }}
    ></div>
  );
};

// A component for the animated demo profiles section
const DemoProfilesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const demoUsers = [
    {
      _id: "1",
      firstName: "Jane",
      lastName: "Doe",
      photoUrl: "https://randomuser.me/api/portraits/women/68.jpg",
      about: "Frontend Developer passionate about React and beautiful UI.",
      skills: ["React", "TypeScript", "Figma"],
    },
    {
      _id: "2",
      firstName: "John",
      lastName: "Smith",
      photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      about: "Backend Engineer specializing in Node.js and microservices.",
      skills: ["Node.js", "GraphQL", "AWS"],
    },
    {
      _id: "3",
      firstName: "Alex",
      lastName: "Ray",
      photoUrl: "https://randomuser.me/api/portraits/lego/1.jpg",
      about: "Full-stack dev who loves building things from scratch.",
      skills: ["Vue", "Python", "Docker"],
    },
  ];
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full max-w-6xl mx-auto my-24 px-4"
    >
      <h2 className="text-4xl font-bold text-center mb-12">
        Meet Our Community
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 ">
        {demoUsers.map((user) => (
          <motion.div key={user._id} variants={itemVariants}>
            <UserCard user={user} isLoggedIn={false} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default function LandingPage() {
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
          setLineIndex((i) => (i + 1) % textLines.length);
        }
      } else {
        if (charIndex < currentLine.length) {
          setText(currentLine.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsErasing(true), 2000);
        }
      }
    };
    const speed = isErasing ? 50 : 100;
    const timeout = setTimeout(handleTyping, speed);
    return () => clearTimeout(timeout);
  }, [text, isErasing, charIndex, lineIndex]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-base-100 text-base-content">
      <GridBackground />
      <CursorAura />

      <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            dev<span className="text-primary">Tinder</span>
          </h1>
          <p className="mt-4 min-h-[56px] text-lg text-base-content/70 sm:text-xl md:text-2xl">
            <span>{text}</span>
            <span className="inline-block w-1 h-6 bg-primary align-middle animate-blink ml-1"></span>
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 justify-center gap-4 sm:flex-row">
            <Link
              to="/login"
              state={{ isSignUp: true }}
              className="btn btn-primary btn-wide group text-lg"
            >
              <FaCode className="mr-2 transition-transform group-hover:-translate-x-1" />
              Create Profile
            </Link>
            <Link to="/login" className="btn btn-ghost btn-wide group text-lg">
              <FaSignInAlt className="mr-2 transition-transform group-hover:translate-x-1" />
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full flex justify-center pb-24 px-4">
        <div className="grid max-w-4xl grid-cols-1 gap-8 text-left md:grid-cols-3">
          <div className="rounded-xl border border-base-content/10 bg-base-200 p-6 shadow-lg">
            <h3 className="text-xl font-bold">Discover</h3>
            <p className="mt-2 text-base-content/70">
              Explore profiles of developers from around the globe. Filter by
              skills, projects, and interests.
            </p>
          </div>
          <div className="rounded-xl border border-base-content/10 bg-base-200 p-6 shadow-lg">
            <h3 className="text-xl font-bold">Connect</h3>
            <p className="mt-2 text-base-content/70">
              Match and collaborate on exciting projects. Find your next
              co-founder, mentor, or friend.
            </p>
          </div>
          <div className="rounded-xl border border-base-content/10 bg-base-200 p-6 shadow-lg">
            <h3 className="text-xl font-bold">Showcase</h3>
            <p className="mt-2 text-base-content/70">
              Build a stunning profile that highlights your best work, top
              skills, and what you're looking for.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <DemoProfilesSection />
      </div>
    </div>
  );
}
