import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";

export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/register", userData)
        .then(res => history.push("/login"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const loginUser = userData => dispatch => {
    console.log(userData, "qwewqe")
const formData = new URLSearchParams();
    formData.append('username', userData.username);
    formData.append('password', userData.password);
    axios
        .post("http://127.0.0.1:8002/users", formData, {
            headers: {
                'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then(res => {
            const { access_token } = res.data;
            localStorage.setItem("jwtToken", access_token);
            setAuthToken(access_token);
            const decoded = jwt_decode(access_token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};


export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};
