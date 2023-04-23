import React, {useEffect, useState} from "react";
import {$user} from "../factories/UserFactory";
import {TextField, Grid, Button} from "@mui/material";
import {useValidate} from "../hooks/useValidate";
import {LOGIN_TEST_VALIDATION_SCHEMA} from "../validationSchema";
import {useIsButtonDisabled, useNavigation, useSerializedData} from "../hooks/common";

export const Home = () => {
    const [params, setParams] = useState({});
    const isButtonDisabled = useIsButtonDisabled({params});
    const serializeData = useSerializedData();
    const navigate = useNavigation();
    const {handleBlur} = useValidate({validatorSchema: LOGIN_TEST_VALIDATION_SCHEMA, setState: setParams});

    const login = async () => {
        await $user.login(serializeData(params));
        setParams({});
        navigate("/about");
    }
    const handleChange = (key, value) => {
        setParams(prev => {
            return {
                ...prev, [key]: {value, error: ""}
            }
        })
    }

    return (
        <>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                <Grid>
                    <TextField value={params?.mobile?.value || ""}
                               onChange={e => handleChange("mobile", e.target.value)}
                               onBlur={e => handleBlur("mobile", e.target.value)} label="Mobile" margin="dense"
                               variant="outlined" size="small" color="primary" fullWidth/>
                    <span style={{fontSize: "12px", color: "red"}}>{params?.mobile?.error || ""}</span>
                    <TextField value={params?.password?.value || ""}
                               onChange={e => handleChange("password", e.target.value)}
                               onBlur={e => handleBlur("password", e.target.value)} label="Password" margin="dense"
                               variant="outlined" size="small" color="primary" fullWidth/>
                    <span style={{fontSize: "12px", color: "red"}}>{params?.password?.error || ""}</span>
                    <Button variant="contained" disabled={isButtonDisabled} onClick={login}
                            color="secondary">Save</Button>
                </Grid>
            </div>

        </>
    )
}
