import axios from 'axios';

const loadUserStarted = () => {
  return {
    type: 'LOAD_USER_STARTED',
  };
};

const loadUserSuccess = (user) => {
  return {
    type: 'LOAD_USER_SUCCESS',
    payload: user,
  };
};

const loadUserFailure = (error) => {
  return {
    type: 'LOAD_USER_FAILURE',
    payload: error,
  };
};

const beginSetUser = () => {
  return {
    type: 'SET_USER_BEGIN',
  };
};

const setUserSuccess = (user) => {
  return {
    type: 'SET_USER_SUCCESS',
    payload: user,
  };
};

const beginEditUser = () => {
  return {
    type: 'EDIT_USER_BEGIN',
  };
};

const editUserSuccess = (user) => {
  return {
    type: 'EDIT_USER_SUCCESS',
    payload: user,
  };
};

const beginLoginUser = () => {
  return {
    type: 'USER_LOGIN_BEGIN',
  };
};

const loginUserSuccess = (user) => {
  return {
    type: 'USER_LOGIN_SUCCESS',
    payload: user,
  };
};

const beginClearUser = () => {
  return {
    type: 'CLEAR_USER_BEGIN',
  };
};

const clearUserSuccess = (user) => {
  return {
    type: 'CLEAR_USER_SUCCESS',
  };
};

const beginSetUserPhoto = () => {
  return {
    type: 'SET_USER_PHOTO_BEGIN',
  };
};

const setUserPhotoSuccess = (userPhoto) => {
  return {
    type: 'SET_USER_PHOTO_SUCCESS',
    payload: userPhoto,
  };
};

export const loadUser = (id) => {
  return (dispatch) => {
    dispatch(loadUserStarted);
    axios.defaults.withCredentials = true;
    return axios
      .get(`${process.env.REACT_APP_API_PREFIX}/api/users/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        const user = res.data.data;
        dispatch(loadUserSuccess(user));
        return user;
      })
      .catch((err) => {
        dispatch(loadUserFailure(err));
      });
  };
};

export const setUser = (user) => {
  return (dispatch) => {
    dispatch(beginSetUser);
    dispatch(setUserSuccess(user));
  };
};

export const loginUser = (user) => {
  return (dispatch) => {
    dispatch(beginLoginUser);
    dispatch(loginUserSuccess(user));
  };
};

export const editUser = (user) => {
  return (dispatch) => {
    dispatch(beginEditUser);
    dispatch(editUserSuccess(user));
  };
};

export const setUserPhoto = (photo) => {
  return (dispatch) => {
    dispatch(beginSetUserPhoto);
    dispatch(setUserPhotoSuccess(photo));
  };
};

export const clearUser = (user) => {
  return (dispatch) => {
    dispatch(beginClearUser);
    dispatch(clearUserSuccess(user));
  };
};
