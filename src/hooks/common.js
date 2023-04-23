import {useDispatch, useSelector} from "react-redux";
import {SET_NOTIFY} from "../constants";
import {useNavigate} from "react-router-dom";

export const useNotify = () => useSelector(state => state.notify);
export const useSetNotify = () => {
    const dispatch = useDispatch();
    return (notify) => dispatch({
        type: SET_NOTIFY,
        notify
    })
}
export const useLoader = () => useSelector(state => state.loader);
export const useSerializedData = () => {
    return (data) => {
        const serializeData = {};
        const dataKeys = Object.keys(data);
        dataKeys.map(key => {
            serializeData[key] = data[key]?.value;
        })
        return serializeData;
    }
}
export const useIsButtonDisabled = ({params}) => {
    return params?.mobile === undefined || params?.mobile === "" && params?.mobile?.error === undefined || params?.mobile?.error !== "" && params?.password === undefined || params?.password === "" && params?.password?.error === undefined || params?.password?.error !== "";
}

export const useNavigation = () => {
    const navigate = useNavigate();
    return (url) => navigate(url);
}
