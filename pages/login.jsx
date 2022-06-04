import React, { Component } from 'react';
import { useState } from 'react'
import { fetcher } from '../lib/api'
import { setToken, unsetToken } from '../lib/auth'
import { useUser } from '../lib/authContext'
import Link from 'next/link'
import Markdown from 'markdown-to-jsx';

const LoginPage = () => {


    const [data, setData] = useState({
        identifier: '',
        password: ''
    })
    const { user, loading } = useUser()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const responseData = await fetcher(`https://koleeum-admin.herokuapp.com/auth/local`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: data.identifier,
                    password: data.password,
                }),
            }
        )
        setToken(responseData)
    }

    const logout = () => {
        unsetToken()
    }

    const handleChange = (e) => {
        console.log('e.target : ', e.target.name, e.target.value)
        setData({ ...data, [e.target.name]: e.target.value })
    }
    
    return (
        <div className="login-page fadeIn">
            <div className="container">
                <div className="container-logo">
                    <img src="https://koleeum-aws-bucket.s3.eu-west-3.amazonaws.com/koleeum_logo_e436aeecd6.svg" />
                </div>
                <form action="#">
                    <input type="text" placeholder="Identifiant" />
                    <input type="password" placeholder="Mot de passe" />
                    <a href="#">Mot de passe oublié</a>
                    <button alt="Pas encore disponible" className="btn disabled" type="submit">Me connecter</button>
                </form>
                <div className="sign-up">
                    <p>Pas encore de compte ? <a href="/evaluation">M'inscrire</a></p>
                </div>
            </div>
            <ul>
                {!loading &&
                    (user ? (
                    <li>
                        <Link href="/profile">
                        <a className="md:p-2 py-2 block hover:text-purple-400">
                            Profile
                        </a>
                        </Link>
                    </li>
                    ) : (
                    ''
                    ))}
                {!loading &&
                    (user ? (
                    <li>
                        <a
                        className="md:p-2 py-2 block hover:text-purple-400"
                        onClick={logout}
                        style={{ cursor: 'pointer' }}
                        >
                        Logout
                        </a>
                    </li>
                    ) : (
                    ''
                    ))}
                {!loading && !user ? (
                    <>
                    <li>
                        <form onSubmit={handleSubmit} className="form-inline">
                        <input
                            type="text"
                            name="identifier"
                            onChange={handleChange}
                            placeholder="Username"
                            className="md:p-2 form-input py-2 rounded mx-2"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="Password"
                            className="md:p-2 form-input py-2 rounded mx-2"
                            required
                        />

                        <button
                            className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
                            type="submit"
                        >
                            Login
                        </button>
                        </form>
                    </li>
                    <li>
                        <Link href="/register">
                        <a className="md:p-2 block py-2 hover:text-purple-400 text-black">
                            Register
                        </a>
                        </Link>
                    </li>
                    </>
                ) : (
                    ''
                )}
            </ul>
        </div>
    )
}

export default LoginPage