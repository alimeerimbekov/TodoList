import React, {useContext} from 'react';
import Form from "../../components/Form/Form";
import {Navigate} from "react-router-dom";
import {CustomContext} from "../../utils/Context";

const Login = () => {

    const {user} = useContext(CustomContext)

    if(user.email?.length !== 0) {
        return <Navigate to='/'/>
    }

    return (
        <div className='login'>
            <Form/>
        </div>
    );
};

export default Login;