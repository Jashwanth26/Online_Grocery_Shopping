import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [data, setData] = useState({
        email: '',
        password: '',
        phone: ''
    });

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/customer/signup', data)
            .then(() => {
                alert("Registered successfully");
                // Clear the form data after successful registration
                setData({
                    email: '',
                    password: '',
                    phone: ''
                });
            })
            .catch(() => alert("Error"));
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
            <form onSubmit={submitHandler} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email" // Added name attribute for proper binding
                        value={data.email} // Corrected to use data.email
                        onChange={changeHandler}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password" // Added name attribute for proper binding
                        value={data.password} // Corrected to use data.password
                        onChange={changeHandler}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone" // Added name attribute for proper binding
                        value={data.phone} // Corrected to use data.phone
                        onChange={changeHandler}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        required
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors font-bold"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="text-primary hover:underline">
                    Sign In
                </a>
            </p>
        </div>
    );
}
