import React,{ useState } from "react";

const Signup = ({isSignedUp} : any) => {
    const [userName, setUsername] = useState('');
    const [language, setLanguage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        }
        if (name === 'language') {
            setLanguage(value);
        }
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (!userName || !language) {
            return;
        }
        const result = await fetch('/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                language
            })
        });

        const {token} = await result.json();
        if (token) {
            localStorage.setItem('token', token);
        }

        isSignedUp();

    }

    return (

        <form id="signup-form" className="mb-6" onSubmit={onSubmit}>
            <div className="mb-6">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your username</label>
                <input type="text" onChange={handleChange} name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bob, alice ..." required/>
            </div>
            <div className="mb-6">
                <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your language</label>
                <input type="text" onChange={handleChange} name="language" id="language" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Signup</button>
        </form>
    )
}

export default Signup