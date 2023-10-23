import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userUpdate } from "../redux/features/AuthActions";

export default function EditUser() {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [initialFirstName, setInitialFirstName] = useState("");
  const [initialLastName, setInitialLastName] = useState("");
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);

  const user = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setInitialFirstName(user.firstName || "");
      setInitialLastName(user.lastName || "");
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setIsFirstNameValid(true);
    setIsLastNameValid(true);
    setFirstName(initialFirstName);
    setLastName(initialLastName);
  };

  const handleUpdateClick = async () => {
    const namePattern = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]{1,30}$/;

    const isFirstNameValid = namePattern.test(firstName);
    const isLastNameValid = namePattern.test(lastName);

    setIsFirstNameValid(isFirstNameValid);
    setIsLastNameValid(isLastNameValid);

    if (isFirstNameValid && isLastNameValid) {
      const updatedUserData = {
        firstName,
        lastName,
      };

      try {
        const result = await dispatch(userUpdate(updatedUserData));
        if (result && result.payload) {
          setIsEditing(false);
          setInitialFirstName(firstName);
          setInitialLastName(lastName);
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du profil :", error);
      }
    }
  };

  const handleFirstNameBlur = () => {
    const namePattern = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]{1,30}$/;
    setIsFirstNameValid(namePattern.test(firstName));
  };

  const handleLastNameBlur = () => {
    const namePattern = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]{1,30}$/;
    setIsLastNameValid(namePattern.test(lastName));
  };

  return (
    <div className="header">
      {isEditing ? (
        <>
          <h1>Welcome back</h1>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={handleFirstNameBlur}
            className={!isFirstNameValid ? "invalid-input" : ""}
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={handleLastNameBlur}
            className={!isLastNameValid ? "invalid-input" : ""}
          />
          <br />
          <button className="edit-button" onClick={handleUpdateClick}>
            Update
          </button>
          <button className="edit-button" onClick={handleCancelClick}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h1>
            Welcome back
            <br />
            {initialFirstName} {initialLastName}!
          </h1>
          <button className="edit-button" onClick={handleEditClick}>
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
}