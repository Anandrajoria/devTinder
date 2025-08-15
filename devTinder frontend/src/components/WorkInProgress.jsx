// src/components/WorkInProgress.jsx
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaCode,
  FaWrench,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const platformThemes = {
  github: {
    icon: <FaGithub className="text-6xl md:text-7xl text-white" />,
    bg: "bg-gradient-to-br from-gray-900 to-gray-800",
    textColor: "text-white",
    button: "from-gray-700 to-gray-900",
  },
  linkedin: {
    icon: <FaLinkedin className="text-6xl md:text-7xl text-white" />,
    bg: "bg-gradient-to-br from-blue-500 to-blue-700",
    textColor: "text-white",
    button: "from-blue-600 to-blue-800",
  },
  portfolio: {
    icon: <FaGlobe className="text-6xl md:text-7xl text-white" />,
    bg: "bg-gradient-to-br from-green-500 to-green-700",
    textColor: "text-white",
    button: "from-green-600 to-green-800",
  },
  project: {
    icon: <FaCode className="text-6xl md:text-7xl text-white" />,
    bg: "bg-gradient-to-br from-purple-500 to-purple-700",
    textColor: "text-white",
    button: "from-purple-600 to-purple-800",
  },
  x: {
    icon: <FaXTwitter className="text-6xl md:text-7xl text-white" />,
    bg: "bg-gradient-to-br from-black to-gray-900",
    textColor: "text-white",
    button: "from-gray-800 to-black",
  },
  default: {
    icon: (
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-6xl md:text-7xl"
      >
        🚧
      </motion.div>
    ),
    bg: "bg-gradient-to-br from-yellow-50 to-white dark:from-gray-900 dark:to-gray-800",
    textColor: "text-gray-800 dark:text-white",
    button:
      "from-yellow-500 to-yellow-600 dark:from-yellow-400 dark:to-yellow-500",
  },
};

const WorkInProgress = () => {
  const navigate = useNavigate();
  const { page } = useParams();

  const theme = platformThemes[page?.toLowerCase()] || platformThemes.default;

  const pageName = page
    ? page.charAt(0).toUpperCase() + page.slice(1)
    : "This page";

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 text-center transition-colors duration-300 ${theme.bg}`}
    >
      {/* Icon */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        {theme.icon}
      </motion.div>

      {/* Heading */}
      <h1
        className={`mt-6 text-4xl md:text-5xl font-extrabold ${theme.textColor}`}
      >
        {pageName} is under construction 🚧
      </h1>

      {/* Subtitle */}
      <p
        className={`mt-4 text-lg md:text-xl max-w-xl ${theme.textColor} opacity-80`}
      >
        We’re working hard to bring you something amazing — stay tuned!
      </p>

      {/* Go Back Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className={`mt-8 px-6 py-3 rounded-xl shadow-lg font-medium bg-gradient-to-r ${theme.button} text-white hover:shadow-2xl transition-all duration-300`}
      >
        ⬅ Go Back
      </motion.button>
    </div>
  );
};

export default WorkInProgress;
