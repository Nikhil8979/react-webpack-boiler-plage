import {useSelector, useDispatch} from "react-redux";
import {SET_USER} from "../constants";

export const useCurrentUser = () => useSelector(state => state.user);

export const useSetCurrentUser = () => {
    const dispatch = useDispatch();
    return (user) => dispatch({
        type: SET_USER,
        user
    })
}
