import { Link } from '@remix-run/react'; 
import { Input } from '~/base/components/ui/input';

interface LoginFormProps {
  error?: string;
}

export function LoginForm({ error }: LoginFormProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex w-full max-w-6xl mx-auto bg-white shadow-md" style={{ height: '80vh' }}>
          
          <div className="flex flex-col justify-center w-8/12 p-12">
            <img src='public/logoText.png' alt="logo"></img>
            <h1 className="text-4xl font-bold mb-8 text-center">Log in</h1>
            <form method='post' action='/login'>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <Input type="email" name="email" id="email" required 
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Enter your email"/>
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <Input type="password" name="password" id="password" required 
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Enter your password"/>
                </div>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <div className="flex justify-center">
                  <button type="submit" className="bg-custom-darkgreen hover:bg-custom-superdarkgreen text-white font-bold py-5 px-6 rounded-lg">Log In</button>
                </div>
            </form>
          </div>

          <div className="w-5/12 bg-teal-500 text-white flex flex-col justify-center items-center p-12">
            <h2 className="text-4xl font-bold mb-3 text-center">Welcome,<br></br> Reward Partner!</h2>
            <p className="text-xl text-center">Join us in creating impactful recycling incentives by registering your details. Together, we can make a difference!</p>
            <Link to="/signup" className="mt-6 bg-white text-teal-500 py-2 px-6 rounded font-bold hover:bg-gray-100">Sign Up</Link>
          </div>
        </div>
    </div>
  );
}
