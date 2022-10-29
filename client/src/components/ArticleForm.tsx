import { useState } from "react";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const ArticleForm = ({ setArticle }: any) => {

    const [language, setLanguage] = useState('');
    const [articleName, setArticleName] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'articleName') {
            setArticleName(value);
        }
        if (name === 'language') {
            setLanguage(value);
        }

        if (name === 'token') {
            setToken(value);
        }
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (!articleName) {
            return;
        }

        // remove all spaces from articleName
        const articleNameWithoutSpaces = articleName.replace(/\s/g, '_');

        const result = await fetch(`${BASE_URL}/introduction/${articleNameWithoutSpaces}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-authentication': token || '',
                'Accept-language': language || 'en'
            }
        });

        const article = await result.json();

        if (article) {
            setArticle(article);
        }

    }

    return (

        <form id="article-form" className="mb-6" onSubmit={onSubmit}>
            <div className="mb-6">
                <label htmlFor="articleName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Article Name</label>
                <input type="text" onChange={handleChange} name="articleName" id="articleName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cat, Dog, Bruce willis" required />
            </div>

            <div className="mb-6">
                <label htmlFor="token" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your token</label>
                <input type="text" placeholder="Optional" onChange={handleChange} name="token" id="token" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div className="mb-6">
                <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your language</label>
                <input type="text" placeholder="Optional" onChange={handleChange} name="language" id="language" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
    )
}

export default ArticleForm