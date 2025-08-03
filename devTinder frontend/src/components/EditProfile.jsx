import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

// Helper components and constants
import UserCard from "./UserCard";
import FormField from "./FormField"; // Assuming FormField.jsx is in the same folder
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";

function EditProfile({ user }) {
  const dispatch = useDispatch();

  // 1. A single state object to hold all form data
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    age: user.age || "",
    gender: user.gender || "male",
    about: user.about || "",
    photoUrl: user.photoUrl || "",
    skills: user.skills || "",
  });

  // State for holding validation errors from the backend
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");

  // 2. Configuration array for all form fields
  const formFieldsConfig = [
    { label: "First Name", name: "firstName", type: "text" },
    { label: "Last Name", name: "lastName", type: "text" },
    { label: "Age", name: "age", type: "number" },
    {
      label: "Gender",
      name: "gender",
      as: "select",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
        { value: "prefer_not_to_say", label: "Prefer not to say" },
      ],
    },
    { label: "About", name: "about", as: "textarea" },
    { label: "Photo URL", name: "photoUrl", type: "text" },
    { label: "Skills", name: "skills", type: "text" },
  ];

  // 3. A single, generic function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveProfile = async () => {
    const hasChanges = formFieldsConfig.some(
      (field) =>
        String(formData[field.name] ?? "") !== String(user[field.name] ?? "")
    );

    if (!hasChanges) {
      return;
    }

    setIsLoading(true);
    setErrors({});
    try {
      // Send the consolidated formData object
      const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
      });
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);

      setTimeout(() => {
        setIsLoading(false);

        dispatch(addUser(res?.data?.data));
      }, 500);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
        setErrorAlert("Please correct the errors and try again.");
      } else {
        setErrorAlert("An unexpected error occurred.");
        console.error("An unexpected error occurred:", error);
      }
      setTimeout(() => {
        setErrorAlert("");
      }, 3000);
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-10 my-10">
        {/* Form Card */}
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit profile</h2>

            {/* 4. Render all form fields dynamically using .map() */}
            {formFieldsConfig.map((field) => (
              <FormField
                key={field.name}
                as={field.as}
                label={field.label}
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleInputChange}
                error={errors[field.name]}
              >
                {/* If the field is a select, render its options */}
                {field.as === "select" &&
                  field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </FormField>
            ))}

            <div className="card-actions justify-center mt-4">
              <button
                className={`btn btn-primary ${isLoading ? "btn-disabled" : ""}`}
                onClick={saveProfile}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Saving...
                  </>
                ) : (
                  "Save Profile"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <UserCard user={formData} />
      </div>

      <div className="toast toast-top toast-end my-20">
        {showSuccessAlert && (
          <div className="alert alert-success">
            <span>Data saved successfully.</span>
          </div>
        )}

        {errorAlert && (
          <div className="alert alert-error">
            <span>{errorAlert}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default EditProfile;
