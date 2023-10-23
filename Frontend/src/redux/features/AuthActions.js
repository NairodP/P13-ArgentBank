import {
  userAuthentication as apiUserAuthentication,
  fetchUserProfile as apiFetchUserProfile,
  updateUserProfile as apiUpdateUserProfile,
} from "./api";
import { setUserToken, setError, setSuccess, setLoading, setSignUpSuccess } from "./AuthSlice";
import { setUserProfile } from "./UserProfileSlice";


export const userAuthentication =
  (userCredentials, actionType) => async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      dispatch(setSuccess(false));
      dispatch(setSignUpSuccess(false));
      
      const result = await apiUserAuthentication(
        userCredentials,
        actionType,
        dispatch,
        getState
      );

      if (result && result.payload) {
        dispatch(setUserToken(result.payload.data.body.token));
        dispatch(setSuccess(true));
        dispatch(setSignUpSuccess(true));
        return result;
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const result = await apiFetchUserProfile(dispatch, getState);

    if (result && result.payload) {
      dispatch(setUserProfile(result.payload.data.body));
      return result;
    }
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const userUpdate = (updatedUserData) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const result = await apiUpdateUserProfile(
      updatedUserData,
      dispatch,
      getState
    );
    // console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};