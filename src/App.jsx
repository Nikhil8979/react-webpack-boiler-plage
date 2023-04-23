import React, {useEffect} from "react";
import {Router} from "./router/Router";
import {CrudProvider} from "@crud/react";
import {$crud} from "./factories/CrudFactory";
import {Provider} from "react-redux";
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import {$user} from "./factories/UserFactory";
import {NotifySnackbar} from "./components/common/NotifySnackbar";
import {ProgressIndicator} from "./components/common/ProgressIndicator";
import {ToastContainer} from "react-toastify";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
    useEffect(() => {
        $user.setStore(store);
        $crud.setStore(store);
    }, [])
    return (
        <Provider store={store}>
             <PersistGate loading={null} persistor={persistor}>
            <CrudProvider crud={$crud}>
                                <ToastContainer/>

                <NotifySnackbar/>
                <ProgressIndicator/>
                    <Router/>
            </CrudProvider>
             </PersistGate>
        </Provider>
    )
}
