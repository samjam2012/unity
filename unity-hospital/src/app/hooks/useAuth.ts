import React from "react";
import { Auth0Context } from "../../providers/auth";
import Auth from "../../interfaces/auth";
const { useContext } = React as any;

const useAuth = (): Auth => useContext(Auth0Context);

export default useAuth;
