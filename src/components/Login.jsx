import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "../main";
import '../App.css';


function Login() {
    const [suggestRegister, setSuggestRegister] = useState(false)
    const isRegister = location.pathname === '/register';

    const navigate = useNavigate();

    useEffect(() => {
        isRegister  && setSuggestRegister(false)
        
    })

    async function register(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData);
        if(isRegister) {
            const { data, error } = await supabase.auth.signUp(
                {
                    email: user.email,
                    password: user.password,
                    options: {
                        data: {
                            name: user.name,
                            color: user.color
                        }
                    }
                }
            );

            if(error) {
                if(error.status === 400) {
                    alert('kullanıcı kayıtlı.');
                }
                else {
                    alert('hatalı veya eksik girildi.');
                }
                
                return;
            }
            
            user.id = data.user.id
            
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .insert([user])
                .select()
        
            navigate('/')
        } else {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: user.email,
                password: user.password,
            })
            
            if(error) {
                setSuggestRegister(true)
                return;
            }
            
            navigate('/');
        }
    }
    
    return (
        <div className='logContainer'>
            
            { <h1 className='loginRegister'>{isRegister   ? <><Link to='/login' >  <span className='loginRegister'> Giriş Yap</span> </Link>  <span className='loginRegister'>Kayıt Ol</span>   </> : <> <span className='loginRegister'>Giriş Yap</span>  <Link to="/register" ><span className='loginRegister'>Kayıt Ol</span>  </Link></>}</h1> }
            <form className='regisForm' onSubmit={register} >
                {isRegister && <p> <input type="text" name="name" placeholder='Adınız' /></p>}
                <p><input required type="email" name="email" placeholder='E-Posta Adresiniz' /></p>
                <p><input required type="password" name="password" placeholder='Şifreniz' /></p>
                <button className='registerButton'> {isRegister ? 'Kayıt Ol' : 'Giriş Yap'} </button>

            </form>
            {suggestRegister && <p className='notRegister' style={{ color: 'red' }}>Kullanıcı Bulunamadı <Link className='click' to="/register">Kayıt Olmak İçin Tıkla </Link></p>}
            
        </div>
    )
} 

export default Login
