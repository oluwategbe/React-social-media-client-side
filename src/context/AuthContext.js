import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "63c6dcb50301c65dde20dd72",
    username: "pelumi",
    email: "pelumi@gmail.com",
    profilePicture: "person/1.jpeg",
    coverPicture: "", 
    isAdmin: false,
    followers: ["63c6f985b3f3ab696b7bd866", "63c6dcd70301c65dde20dd74"],
    followings: ["63c6f985b3f3ab696b7bd866"],
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider value={{
      user: state.user, 
      isFetching: state.isFetching, 
      error: state.error,
      dispatch
    }}>
      {children}
    </AuthContext.Provider>
  )
}