import axios from "axios";
import { setUserToken, setError, setSuccess, setLoading } from "./AuthSlice";
import { setUserProfile } from "./UserProfileSlice";
import { hostName } from "../../config.js";

const baseURL = `${hostName}/api/v1/user`;

export const userAuthentication = async (
  userCredentials,
  actionType,
  dispatch,
  getState
) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    dispatch(setSuccess(false));

    const auth = getState().auth;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (auth && auth.userToken) {
      config.headers.Authorization = `Bearer ${auth.userToken}`;
    }

    let response;

    if (actionType === "login") {
      response = await axios.post(`${baseURL}/login`, userCredentials, config);
    } else if (actionType === "signup") {
      response = await axios.post(`${baseURL}/signup`, userCredentials, config);
    }

    if (response && response.data) {
      dispatch(setUserToken(response.data.body.token));
      dispatch(setSuccess(true));
      // Retourne la structure de données attendue avec la propriété payload
      return {
        payload: response,
      };
    }
    return response;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Adresse email déjà existante
      dispatch(setError("Un compte est déjà associé à cette adresse email !"));
    } else if (error.response && error.response.status === 500) {
      // Probleme sur le server
      dispatch(setError("Un problème a été rencontré sur le server !"));
    } else {
      // Autres erreurs
      dispatch(setError(error.message));
    }
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchUserProfile = async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const auth = getState().auth;

    if (auth && auth.userToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.userToken}`,
        },
      };

      const response = await axios.post(`${baseURL}/profile`, {}, config);

      if (response && response.data) {
        dispatch(setUserProfile(response.data.body));
        return {
          payload: response,
        };
      }
      return response;
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateUserProfile = async (updatedUserData, dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const auth = getState().auth;

    const config = {
      headers: {
        Authorization: `Bearer ${auth.userToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.put(`${baseURL}/profile`, updatedUserData, config);

    if (response && response.data) {
      dispatch(setUserProfile(response.data.body));
      return {
        payload: response,
      };
    }
    return response;
  } catch (error) {
    // Gére les erreurs liées à la mise à jour du profil
    console.error("Erreur lors de la mise à jour du profil :", error);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
