import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/authcontext";
import { useForm } from "react-hook-form";
import { User } from "../../models/user";

export default function Login() {

  const navigate = useNavigate();

  const { isLoggedIn, login } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    mode: "onChange",
  });

  const onSubmit = (data: User) => {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJleHAiOjE3Mjk5MTM0NDd9.5WQleKeW4wkzWV2SXkM6gMdCbQn3GUGUvWc5gCd58M15752fjJpOi42u--dr76AYR0_HNHwy_JmN43HehiEfdg';
    const user = { username: 'sandip', fullName: 'Sandip Shakya', password: data.password, email: 'sandipshakya@gmail.com' };
    login(token, user);
    navigate('/');
  };

  return isLoggedIn() ? (<Navigate to="/" />) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (<span className="text-red-500 text-sm">{errors.username.message?.toString()}</span>)}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (<span className="text-red-500 text-sm">{errors.password.message?.toString()}</span>)}
          </div>
          <div className="flex items-center justify-end">

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to={`/register`} className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>

  )
}
