import {SET_USER, SET_NOTIFY, SET_LOADER} from "../constants";

export const reducer = () => (state = {
    user: null,
    notify: null,
    loader: false
}, action) => {
    const {type} = action;
    switch (type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            };
        case SET_NOTIFY:
            return {
                ...state,
                notify: action.notify
            }
        case SET_LOADER:
            return {
                ...state,
                loader: action.loader
            }
        default:
            return state;
    }
};
