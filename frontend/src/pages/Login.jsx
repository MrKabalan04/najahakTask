import {useState} from 'react'
import '../styles/pages/Login.css'
export default function Login({ onLogin }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;
    onLogin(username, password);
    }
    
    return(
        <div className="seperator">
            <div className="first">
                <h1>Simplify your workflow.</h1>
                <p>Track requests. Update progress. Deliver results.</p>
            </div>

            <div className="second">
                <div className="login-container">
                    <div className="login-form">
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                placeholder="Enter your username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className="login-button" type="submit">Login</button>
                        </form>
                    </div>
                </div>                
            </div>
        </div>
    )
}