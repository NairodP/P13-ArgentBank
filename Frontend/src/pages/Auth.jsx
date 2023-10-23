import "/src/css/pages/Auth.css";
import { useState, useEffect } from "react";
import InputFieldForm from "../components/InputFieldForm";
import {
  fetchUserProfile,
  userAuthentication,
} from "../redux/features/AuthActions";
import { resetAuthState } from "../redux/features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PopUpSignUp from "../components/PopUpSignUp";

const nameRegex = /^[A-Za-z]+$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export default function Auth() {
  const [isLoginModal, setIsLoginModal] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const isSignUpSuccess = useSelector((state) => state.auth.signUpSuccess);

  // Effet secondaire pour réinitialiser signUpSuccess
  useEffect(() => {
    checkFieldsEmpty();
    if (isSignUpSuccess) {
      const timer = setTimeout(() => {
        dispatch(resetAuthState()); // Dispatchez l'action pour réinitialiser signUpSuccess
      }, 6000);

      // Nettoyez le timer si le composant est démonté avant que le délai ne s'écoule
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isSignUpSuccess]);

  const errorMessages = {
    email: "Adresse email invalide",
    name: "Le champ ne doit contenir que des lettres",
    passwordMatch: "Les mots de passe ne correspondent pas",
    required: "Le champ est vide",
  };

  const checkFieldsEmpty = () => {
    let requiredFields = ["email", "password"];

    if (!isLoginModal) {
      requiredFields = [
        "email",
        "firstName",
        "lastName",
        "password",
        "repeatPassword",
      ];
    }

    const fieldsAreEmpty = requiredFields.some((field) => !formData[field]);

    if (fieldsAreEmpty) {
      dispatch(resetAuthState());
    }
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    // Gérer les erreurs en fonction du champ
    let newFieldErrors = { ...fieldErrors };

    if (field === "email") {
      if (!emailRegex.test(value)) {
        newFieldErrors.email = errorMessages.email;
      } else {
        newFieldErrors.email = "";
      }
    } else if (field === "password" || field === "repeatPassword") {
      if (formData.password !== formData.repeatPassword) {
        newFieldErrors.passwordMatch = errorMessages.passwordMatch;
      } else {
        newFieldErrors.passwordMatch = "";
      }
    } else if (field === "firstName" || field === "lastName") {
      if (!nameRegex.test(value)) {
        newFieldErrors.name = errorMessages.name;
      } else {
        newFieldErrors.name = "";
      }
    } else {
      if (value.trim() === "") {
        newFieldErrors[field] = errorMessages.required;
      } else {
        newFieldErrors[field] = "";
      }
    }

    setFieldErrors(newFieldErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetAuthState());

    // Vérification des champs vides après la soumission
    let requiredFields = ["email", "password"];
    let hasErrors = false;
    const newFieldErrors = {};

    if (!isLoginModal) {
      requiredFields = [
        ...requiredFields,
        "firstName",
        "lastName",
        "repeatPassword",
      ];

      if (!emailRegex.test(formData.email)) {
        newFieldErrors.email = errorMessages.email;
        hasErrors = true;
      }

      if (formData.password !== formData.repeatPassword) {
        newFieldErrors.password = errorMessages.passwordMatch;
        newFieldErrors.repeatPassword = errorMessages.passwordMatch;
        hasErrors = true;
      }

      for (const field of ["firstName", "lastName"]) {
        if (!nameRegex.test(formData[field])) {
          newFieldErrors[field] = errorMessages.name;
          hasErrors = true;
        }
      }
    } else {
      // Si c'est le formulaire "Login", supprimer les champs inutiles
      delete formData.firstName;
      delete formData.lastName;
      delete formData.repeatPassword;
    }

    for (const field of requiredFields) {
      if (formData[field] === "") {
        newFieldErrors[field] = errorMessages.required;
        hasErrors = true;
      }
    }

    // Mise à jour des erreurs de champ
    setFieldErrors(newFieldErrors);
    // console.log(newFieldErrors);

    // Si le formulaire n'a pas d'erreurs, continuez avec l'envoi
    if (!hasErrors) {
      let userCredentials = {
        email: formData.email,
        password: formData.password,
      };

      if (!isLoginModal) {
        userCredentials.firstName = formData.firstName;
        userCredentials.lastName = formData.lastName;
      }

      const actionType = isLoginModal ? "login" : "signup";

      try {
        const result = await dispatch(
          userAuthentication(userCredentials, actionType)
        );

        if (result && result.payload) {
          setFormData({
            email: "",
            password: "",
            repeatPassword: "",
            firstName: "",
            lastName: "",
          });

          try {
            dispatch(fetchUserProfile());
          } catch (error) {
            console.error(error);
          }

          if (isLoginModal) {
            // Redirige vers la page d'accueil après une connexion réussie
            navigate("/profile");
          } else {
            // Redirige vers la page de connexion après une inscription réussie
            // window.location.href = "/login";
            setIsLoginModal(!isLoginModal);
            if (actionType === "signin") {
              console.log(`c'est une inscription`);
              dispatch(userAuthentication.setSignUpSuccess(true));
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        {isSignUpSuccess && <PopUpSignUp />}
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>{isLoginModal ? "Login" : "Sign Up"}</h1>
        <form onSubmit={handleSubmit}>
          {!isLoginModal && (
            <>
              <InputFieldForm
                id="email"
                label="Email"
                type="text"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={fieldErrors.email}
                required
              />
              <InputFieldForm
                id="firstName"
                label="Firstname"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                error={fieldErrors.firstName}
                required
              />
              <InputFieldForm
                id="lastName"
                label="Lastname"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                error={fieldErrors.lastName}
                required
              />
              <InputFieldForm
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                error={fieldErrors.password}
                required
              />
              <InputFieldForm
                id="repeat-password"
                label="Repeat Password"
                type="password"
                value={formData.repeatPassword}
                onChange={(e) => handleChange("repeatPassword", e.target.value)}
                error={fieldErrors.repeatPassword}
                required
              />
            </>
          )}

          {isLoginModal && (
            <>
              <InputFieldForm
                id="email"
                label="Email"
                type="text"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={fieldErrors.email}
                required
              />
              <InputFieldForm
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                error={fieldErrors.password}
                required
              />
            </>
          )}

          <button type="submit" className="sign-in-button">
            {loading ? "Loading..." : isLoginModal ? "Login" : "Sign Up"}
          </button>

          <p className="switch-link">
            {isLoginModal ? "Pas encore de compte ?" : "Déjà un compte ?"}
            <span
              className="switch-btn"
              onClick={() => setIsLoginModal(!isLoginModal)}
            >
              {isLoginModal ? "S'inscrire" : "Se connecter"}
            </span>
          </p>
          {error && (
            <div className="error" role="alert">
              {error}
            </div>
          )}
        </form>
      </section>
    </main>
  );
}
