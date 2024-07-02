import { LinksFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { Button } from '~/base/components/ui/button';
import { Input } from '~/base/components/ui/input';

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: '/styles/auth.css' }];
};

export function Login() {

    return (
        <div className="loginDiv">
            <div className="leftSide">
                <h2> Welcome back !</h2>
                <form method="POST">
                    <Input type="text" name="email" placeholder="Email" />
                    <Input type="password" name="password" placeholder="Password" />
                    <Button type="submit" variant={"ghost"}> Log In</Button>
                </form>
                <Link to="/auth/register">Create Account</Link>
            </div>
        </div>
    )
}