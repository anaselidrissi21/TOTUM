import './login.scss';
import React from 'react';
import LoginForm from './LoginForm/LoginForm';



function Login(){
    


        return (
                <div className='login'>
                    
                    
                    <a href="/createProfil">Pas encore inscrit ?</a>
                    <LoginForm/>
                    <a href="/activities">Découvrir l'application</a>
                </div>
        );
};

export default Login;
