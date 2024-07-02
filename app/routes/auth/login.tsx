import { LinksFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: '/styles/auth.css' }];
  };

export function Login(){
    
    return(
        <div className="loginDiv">
            <div className="leftSide">
                <h2> Welcome back !</h2>
                <form method="POST">
                    <input type="text" name="email" placeholder="Email"></input>
                    <input type="password" name="password" placeholder="Password"></input>
                    <button type="submit"> Log In</button>
                </form>
                <Link to="/auth/register">Create Account</Link>
            
            </div>
            <div className="rightSide">
                <img src="build/server/assets/loginPic.png" alt="log in Pic"></img>
            </div>
        </div>
    )
}