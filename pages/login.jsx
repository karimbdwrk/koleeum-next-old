import React, { Component } from 'react';
import Markdown from 'markdown-to-jsx';

const LoginPage = () => {
    
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
        </div>
    )
}

export default LoginPage