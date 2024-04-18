import axios from "axios";
import {
    GET_ERRORS,
    TOKEN_ADD,
    TOKEN_UPDATE
} from "./types";

export const addToken = (tokenData) => dispatch => {
    axios
        .post("http://127.0.0.1:8002/tokens/create", tokenData)
        .then(res =>
            dispatch({
                type: TOKEN_ADD,
                payload: res.data,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const updateToken = (tokenId, tokenData) => dispatch => {
    console.log(tokenId)
    console.log(tokenData)
    axios
        .patch(`http://127.0.0.1:8002/tokens/update/${tokenId}`, tokenData)
        .then(res =>
            dispatch({
                type: TOKEN_UPDATE,
                payload: res.data,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};