import React, {useContext} from 'react';
import {useForm} from "react-hook-form";
import {Link, useNavigate, useLocation} from "react-router-dom";
import axios from "../../utils/axios";
import {CustomContext} from "../../utils/Context";


const Form = () => {

    const {
        register,
        reset,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm({mode: "onBlur"})

    const location = useLocation()

    const navigate = useNavigate()

    const {setUser, user} = useContext(CustomContext)

    const registerUser = (data) => {
        axios.post('/register', {...data, categories: []})
            .then((res) => {
            setUser({
                token: res.data.accessToken,
                ...res.data.user
            })
            localStorage.setItem('user', JSON.stringify({
                token: res.data.accessToken,
                ...res.data.user
            }))
            reset()
            navigate('/')
        })
            .catch((err) => console.log(err))
    }

    const loginUser = (data) => {
        axios.post('/login', {...data})
            .then((res) => {
            setUser({
                token: res.data.accessToken,
                ...res.data.user
            })
            localStorage.setItem('user', JSON.stringify({
                token: res.data.accessToken,
                ...res.data.user
            }))
            reset()
            navigate('/')
        })
            .catch((err) => console.log(err))
    }

    const onSubmit = (data) => {
        location.pathname === '/register' ? registerUser(data) : loginUser(data)
    }


    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)} className='form'>

            <h2 className='form__title'>
                {
                    location.pathname === '/register' ? 'Регистрация' : 'Вход'
                }
            </h2>

            {
                location.pathname === '/register' ? <label className='form__label'>
                    <input {...register('login', {
                        required: {
                            message: 'Please enter your login',
                            value: true
                        },
                        maxLength: {
                            value: 10,
                            message: 'Maximum length of the form 10 symbol'
                        },
                        minLength: {
                            value: 3,
                            message: 'Minimum length of the form 3 symbol'
                        }

                    })} className='form__field' type="text" placeholder='Введите логин'/>
                    <p className="form__error">{errors.login && errors.login.message}</p>
                </label> : ''
            }


            <label className='form__label'>
                <input
                    {...register('email', {
                        required: {
                            message: 'Please enter your email',
                            value: true
                        },
                        minLength: {
                            message: 'Minimum length for email 10 symbol',
                            value: 10
                        },
                        pattern: {
                            message: 'Pattern for email',
                            value: /^[^ ]+@[^ ]+\.[a-z]{2,5}$/
                        }
                    })}
                    autoComplete="on" className='form__field' type="email" placeholder='Введите Email'/>

                <p className="form__error">{errors.email && errors.email.message}</p>

            </label>

            <label className='form__label'>
                <input
                    {...register('password', {
                        required: {
                            message: 'Please enter your password',
                            value: true
                        },
                        pattern: {
                            message: 'The password must contain at least 8 characters, an uppercase letter and a number',
                            value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g
                        }
                    })}
                    className='form__field' autoComplete="current-password" type="password"
                    placeholder='Введите пароль'/>
                <p className="form__error">{errors.password && errors.password.message}</p>

            </label>

            <button className='form__btn' type='submit'>
                {
                    location.pathname === '/register' ? 'Зарегистрироваться' : 'Войти'
                }
            </button>

            <p className="form__text">
                {
                    location.pathname === '/register' ?
                        <>
                            У меня уже есть аккаунт чтоб <Link className='form__link' to={'/login'}>войти</Link>
                        </> :
                        <>
                            Еще нет аккаунта ? <Link className='form__link' to={'/register'}>Регистрация</Link>
                        </>
                }</p>

        </form>

    );
};

export default Form;