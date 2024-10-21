import { useForm } from "react-hook-form";
import { Link, useNavigate  } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const defaultValues: any = {
    fullName: "John Doe",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { register, handleSubmit, formState: { errors } } = useForm<any>({
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    console.log(data);
    navigate('/login')
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Full Name"
              {...register("fullName", { required: "Full Name is required" })}
            />
            {errors.fullName && (<span className="text-red-500 text-sm">{errors.fullName.message?.toString()}</span>)}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address"
                }
              })}
            />
            {errors.email && (<span className="text-red-500 text-sm">{errors.email.message?.toString()}</span>)}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters long" }
              })}
            />
            {errors.password && (<span className="text-red-500 text-sm">{errors.password.message?.toString()}</span>)}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Confirm Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value, { password }) => value === password || "Passwords do not match"
              })}
            />
            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message?.toString()}</span>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to={`/login`} className="font-medium text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
