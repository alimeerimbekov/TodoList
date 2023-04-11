import React, {useContext} from 'react';
import {CustomContext} from "../../utils/Context";
import {Navigate} from "react-router-dom";
import Aside from "./Aside";
import {ToastContainer} from "react-toastify";
import HomeContent from "./HomeContent";
import '../../styles/home.scss'

const Home = () => {

    const {user} = useContext(CustomContext)

    if (user.email.length === 0) {
        return <Navigate to='/login'/>
    }

    return (
        <section className='home'>

            <Aside/>

            <HomeContent/>

            <ToastContainer/>
        </section>
    );
};

export default Home;