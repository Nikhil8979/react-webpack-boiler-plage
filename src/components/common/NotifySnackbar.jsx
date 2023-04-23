import React from "react";
import {useNotify} from "../../hooks/common";
import {toast} from "react-toastify";

export const NotifySnackbar = () => {
    const notify = useNotify();
    !!notify && notify?.type === "error" ? toast.error(notify?.message) : notify?.type === "success" && toast.success(notify?.success)
}
