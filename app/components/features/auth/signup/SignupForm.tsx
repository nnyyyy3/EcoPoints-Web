import { Button } from '~/base/components/ui/button';
import { Input } from '~/base/components/ui/input';
import { Link } from '@remix-run/react';

interface SignupFormProps {
  error?: string;
}

export function SignupForm({ error }: SignupFormProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-6xl mx-auto bg-white shadow-md" style={{ height: '80vh' }}>
        <div className="flex flex-col justify-center w-8/12 p-16">
          <img src='public/logoText.png' alt="logo"></img>
          <h1 className="text-4xl font-bold mb-8 text-center">Sign Up</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form method="post" action="/signup" encType="multipart/form-data">
            <div className="mb-4">
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">Display Name</label>
              <Input type="text" name="displayName" id="displayName" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your display name"/>
            </div>
            <div className="mb-4">
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">Owner Name</label>
              <Input type="text" name="ownerName" id="ownerName" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your name"/>
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <Input type="tel" name="phoneNumber" id="phoneNumber" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your phone number"/>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email"/>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Input type="password" name="password" id="password" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your password"/>
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <Input type="password" name="confirmPassword" id="confirmPassword" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Confirm your password"/>
            </div>
            <div className="mb-6">
              <label htmlFor="idPicture" className="block text-sm font-medium text-gray-700">Upload ID</label>
              <Input type="file" name="idPicture" id="idPicture" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="bg-custom-darkgreen hover:bg-custom-superdarkgreen text-white font-bold py-5 px-6 rounded-lg">Sign Up</Button>
            </div>
          </form>
        </div>
        <div className="w-5/12 bg-teal-500 text-white flex flex-col justify-center items-center p-12">
          <h2 className="text-4xl font-bold mb-3 text-center">Welcome Aboard!</h2>
          <p className="text-xl text-center">Become a part of our mission to foster sustainability and eco-friendly practices. Register now and start making an impact today!</p>
          <Link to="/login" className="mt-6 bg-white text-teal-500 py-2 px-6 rounded font-bold hover:bg-gray-100">Log In</Link>
        </div>
      </div>
    </div>
  );
}
