import React, { Fragment, useState } from 'react';
import ArticleForm from './components/ArticleForm';
import Signup from './components/Signup';
import logo from './logo.png';
import './style.css';

function App() {
  const [showSignupButton, setShowSignupButton] = useState(true);
  const [showSignup, setSignup] = useState(false);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [article, setArticle] = useState<any>(null);

  const isSignedUp = () => {
    setSignup(false);
    setShowArticleForm(true);
  };

  const hasArticle = (article: any) => {
    setArticle(article);
    setShowArticleForm(false);
  };

  const reset = () => {
    setArticle(null);
    setShowArticleForm(true);
  }

  const { introduction, articleName, scrapeDate } = article || {};
  const displayDate = new Date(scrapeDate).toLocaleDateString();
  return (
    <div id="periapt-client" className='max-w-xl h-full mx-auto py-12 flex flex-col gap-4 justify-center align-middle place-items-center text-xl'>
      <header className="App-header">
        <img src={logo} className="logo" alt="logo" />
      </header>
      {showSignupButton &&
        <Fragment>
          <button onClick={() => { setShowSignupButton(false); setSignup(true) }} className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
            Sign Up
          </button>
        </Fragment>
      }
      {showSignup && <Signup isSignedUp={isSignedUp} />}
      {showArticleForm && <ArticleForm setArticle={hasArticle} />}

      {article && introduction && (
        <>
          <button onClick={() => reset()}>Reset</button>
          <hr/>
          <div className="article">
            <h4 className="text-2xl font-bold">{`Article Name: ${articleName}`}</h4>
            <h4 className="text-xl font-bold">{`Retrieved on: ${displayDate}`}</h4>
            <h4 className="text-2xl font-bold">{introduction}</h4>
          </div>
        </>
      )}
    </div>
  );
}

export default App;