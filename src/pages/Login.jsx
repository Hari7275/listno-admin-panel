{/*import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { LogIn } from "lucide-react";


import { useCreateAdminLoginMutation } from "../store/api/auth/adminLogin";
import { useAppDispatch } from "../app/hooks";

import {login} from "../store/slices/authSlice";

// Zod schema
const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

 
  const [createAdminLogin , { isLoading }] = useCreateAdminLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

 const onSubmit = async (values) => {
  try {
    const payload = {
      loginType: "EMAIL",
      email: values.email,
      password: values.password,
    };

    const response = await createAdminLogin(payload).unwrap();

    console.log("API response:", response);

    const data = response?.data;

    dispatch(
      login({
        user: {
          email: values.email,
        },
        role: data?.activeRole,        // ✅ ADMIN
        permissions: {},               // (fill later if API gives)
        token: data?.accessToken,      // ✅ IMPORTANT
        prod: true,
      })
    );

    toast.success("Logged in successfully");
    navigate(from, { replace: true });

  } catch (err) {
    console.error(err);
    toast.error(err?.data?.message || "Login failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 w-full max-w-md space-y-5"
      >
        <div className="text-center">
          <div className="inline-flex p-3 bg-brand-50 rounded-full mb-3">
            <LogIn className="text-brand-600" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to access your dashboard
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2.5 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>

        <div className="text-center text-sm text-gray-500">
          <Link to="/" className="hover:text-brand-600">
            ← Back to home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

*/}

import { ArrowLeft, Shield, Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice"; // ✅ FIXED PATH + ACTION

import {
  useCreateRegisterDeviceMutation,
  useLoginWithEmailMutation,
} from "../store/api/auth/adminLogin";

import { getDeviceId, getDeviceInfo } from "../lib/deviceInfo";

export default function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginWithEmail, { isLoading }] = useLoginWithEmailMutation();
  const [registerDevice] = useCreateRegisterDeviceMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const deviceInfo = getDeviceInfo();

      // ✅ Register Device
      await registerDevice({
        deviceId: getDeviceId(),
        deviceType: "WEB",
        fcmToken: "web-dummy-token",
        osName: deviceInfo.osName,
        appVersion: deviceInfo.appVersion,
        appInstallSource: deviceInfo.appInstallSource,
        deviceModel: deviceInfo.deviceModel,
      }).unwrap();

      // ✅ Login API
      const res = await loginWithEmail({
        loginType: "EMAIL",
        email,
        password,
      }).unwrap();

      const data = res?.data;

      if (!data?.accessToken) {
        alert("Token not found");
        return;
      }

      // ✅ Store full auth data (IMPORTANT FIX)
      dispatch(
        login({
          token: data.accessToken,
          user: data.user || null,
          role: data.role || null,
          permissions: data.permissions || {},
          prod: data.prod || false,
        })
      );

      // ✅ Redirect
      navigate("/adminPanel");

    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert(error?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center py-10 bg-gradient-to-r from-[#2b1a4b] to-[#4b1d73] relative">

      {/* Back Button */}
      {/*<button className="absolute top-6 left-6 flex items-center gap-2 bg-[#3a2a5c] text-white px-4 py-2 rounded-full hover:bg-[#4a3a6c] transition">
        <ArrowLeft size={18} />
        Back to Website
      </button>*/}

      {/* Card */}
      <div className="bg-[#f5f5f7] w-[450px] rounded-3xl shadow-xl p-8 text-center">

        {/* Icon */}
        <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-purple-200 mb-4">
          <Shield className="text-purple-600" size={28} />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800">Admin Portal</h1>
        <p className="text-gray-500 mt-1 mb-6">Secure access only</p>

        {/* Email */}
        <div className="text-left mb-4">
          <label className="text-gray-700 font-medium">Email</label>
          <input
            type="email"
            placeholder="admin@listno.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 outline-none focus:border-purple-500"
          />
        </div>

        {/* Password */}
        <div className="text-left mb-4">
          <label className="text-gray-700 font-medium">Password</label>
          <div className="relative mt-2">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-gray-100 outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 text-blue-700 text-sm p-4 rounded-xl border border-blue-200 mb-6">
          <span className="font-semibold">Demo Mode:</span> Enter valid credentials
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        {/* 2FA */}
        <p className="text-purple-600 mt-4 cursor-pointer hover:underline">
          Enable 2FA
        </p>
      </div>
    </div>
  );
}