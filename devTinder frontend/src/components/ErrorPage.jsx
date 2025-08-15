import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = ({ code, title, message }) => {
  const location = useLocation();

  // Default error messages if not provided
  const defaultErrors = {
    404: {
      title: "Page Not Found",
      message: "The page you’re looking for doesn’t exist or has been moved.",
    },
    500: {
      title: "Server Error",
      message: "Something went wrong on our end. Please try again later.",
    },
    403: {
      title: "Access Denied",
      message: "You don’t have permission to view this page.",
    },
    default: {
      title: "Unexpected Error",
      message: "An unknown error occurred. Please try again.",
    },
  };

  const errorData = defaultErrors[code] || defaultErrors.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-base-200"
    >
      <motion.h1
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-7xl font-bold text-primary"
      >
        {code || "Error"}
      </motion.h1>
      <h2 className="mt-4 text-3xl font-bold">
        {title || errorData.title}
      </h2>
      <p className="mt-2 text-lg text-base-content/70 max-w-md">
        {message || errorData.message}
      </p>

      <Link
        to="/"
        className="mt-6 btn btn-primary shadow-lg hover:scale-105 transition-transform"
      >
        Go Home
      </Link>

      <p className="mt-4 text-sm text-base-content/50">
        Path: {location.pathname}
      </p>
    </motion.div>
  );
};

export default ErrorPage;
