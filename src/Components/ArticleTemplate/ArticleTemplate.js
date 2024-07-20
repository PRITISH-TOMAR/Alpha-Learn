
import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Highlight from '../Essantials/Highlight';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import RandomCard from './RandomCard';
import Comment from './Comment';
import { FaEdit, FaHeart } from "react-icons/fa";
import { Typography } from '@mui/material';


export default function ArticleTemplate() {

  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);
  const location = useLocation()
  const [artId, setArtId] = useState('')
  const [formData, setFormData] = useState('')
  const [liked, setLiked] = useState(false)
  const navigate = useNavigate()



  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('unique');
    if (tabFromUrl)
      setArtId(tabFromUrl);

  }, [location.search]);

  useEffect(() => {
    {
      if (artId) {

        const fetchArticle = async () => {
          try {
            if (artId) {

              const res = await axios.get(`${process.env.REACT_APP_ARTICLE_END}/retrieve?artId=${artId}`);
              if (res.status === 200) {
                if (res.data.resData)

                  setFormData(res.data.resData[0]);
                setLoading(false)
              }
            }
          } catch (error) {
          }
        };
        fetchArticle();
      }
    }
  }, [artId, liked]);

  const UpdateArticle = (artId) => {
    navigate(`/dashboard?tab=update&uid=${artId}`)

  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  const deleteArt = async (_id) => {

    try {
      const res = await axios.delete(`${process.env.REACT_APP_ARTICLE_END}/delete`, {
        data: { _id, userId: user && user._id } 
      });

      if (res.status === 200) {
        // setDeleted(true)
        navigate('/')
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };



  /////////////////////////////////////////////////
  const handleLike = async (id) => {
    try {
      if (!user && !user._id) {
        navigate('/sign-in');
        return;
      }
      const res = await axios.put(`${process.env.REACT_APP_ARTICLE_END}like?id=${id}&user=${user.uniqueName}`);
      if (res.status) {
        setLiked(!liked)
      }
    } catch (error) {
    }
  };
  ///////////////////////////////////////////////////////////

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto w-full min-h-screen'>
      <h1 className='lg:text-4xl text-[28px] mt-10 p-3 w-fit text-gray-200 font-semibold  lg:text-4xl border-b '>
        <Highlight text={formData.art_name} />


      </h1>

      <div className='flex  items-center justify-between text-gray-400'>

        <span className='pl-2'>Last Updated at : {new Date(formData.updatedAt).toLocaleDateString()}</span>
        {

          (user && user._id == formData.userId) &&

          <FaEdit color='white' className='cursor-pointer' size={20} onClick={(e) => { UpdateArticle(formData.artId) }} />
        }
      </div>



      {/* <img
          src={ formData.image}
          alt={ formData.art_name}
          className='mt-10  max-h-[600px] self-center max-w-[700px] w-full h-full object-cover border-2 border-white rounded-[10px]'
        /> */}
      <div>
        <div className='flex justify-between px-3 py-2 mt-4 border-b  items-center border-slate-500 mx-auto w-full text-md text-gray-400'>

          <div

            className='self-center mt-5 flex justify-between gap-2 w-fit items-center'
          >
            <Link to={`/resources?category=${formData.category}`}>
              <Button className='bg-gray-600 font-normal lowercase text-gray-100 border-none' pill size='sm'>
                # {formData.category}
              </Button>
            </Link>
            <Button className='hidden md:block bg-gray-600 font-normal lowercase text-gray-100 border-none' pill size='sm'>
              {formData.artId}
            </Button>
          </div>

          <span className='italic text-md place-self-end'>
            {(formData.content.length / 1000).toFixed(0)} mins read
          </span>
        </div>
      </div>
      <div className='w-full max-w-5xl self-center'>


        <div
          className='p-3 max-w-5xl mx-auto w-full post-content flex flex-col    text-lg text-gray-300 '
          dangerouslySetInnerHTML={{ __html: formData.content }}
        ></div>

        <Typography className='text-md text-gray-500 flex justify-end items-center gap-2 pt-4 '>
          {user &&
            formData.likes.includes(user.uniqueName) ? "Thanks!"
            : "Loved it? Drop a like here!"
          }

          <button
            type='button'
            onClick={() => { user && user._id ? handleLike(formData._id) : navigate("/signup") }}
            className={`text-gray-400  ${user &&
              formData.likes.includes(user.uniqueName) &&
              'text-red-500'
              }`}
          >
            <FaHeart className='text-sm' />
          </button>


        </Typography>


      </div>


      <div className='mx-auto mt-8 w-fit gap-2 flex justify-center items-center  border-2 border-gray-900 flex-col '>

        <RandomCard />
        <Comment artId={artId} />
      </div>


    </main>
  );
}


 
// <h2>Getting Started with React: Installation and Environment Setup</h2><p>Before embarking on your React journey, ensure you have a suitable development environment set up. Here’s a roadmap to get you started:</p><ol><li><strong>Node.js and npm:</strong>&nbsp;Download and install Node.js (<a href="https://nodejs.org/en/download/package-manager/current" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">https://nodejs.org/en/download/package-manager/current</a>) as it provides the runtime environment for JavaScript code execution. npm (Node Package Manager) is bundled with Node.js and is used to manage project dependencies.</li><li><strong>Create React App (CRA):</strong>&nbsp;Using Create React App (CRA) to establish a new React project with minimal configuration. Run<strong>&nbsp;</strong><code><strong>npx create-react-app my-react-app</strong></code><strong>&nbsp;</strong>in your terminal, replacing&nbsp;<code>my-react-app</code>&nbsp;with your desired project name.</li></ol><h3><strong>Basic Example of React:</strong></h3><p>ReactJS</p><p><br></p><p><br></p><pre class="ql-syntax" spellcheck="false">import React from 'react';
// import ReactDOM from 'react-dom/client';

// function Hello(props) {
//   return &lt;h1&gt;Hello GeeksforGeeks&lt;/h1&gt;;
// }

// const container = document.getElementById("root");
// const root = ReactDOM.createRoot(container);
// root.render(&lt;Hello /&gt;);
// </pre><p><br></p><p>This code defines a functional component named&nbsp;<code>App</code>&nbsp;that returns&nbsp;<strong>JSX code</strong>&nbsp;displaying the text “Hello GeeksforGeeks”.&nbsp;<strong>Save the file and run</strong>&nbsp;your development server using&nbsp;<code><strong>npm start</strong></code>. Navigate to<strong>&nbsp;</strong><code><strong>http://localhost:3000/</strong></code>&nbsp;in your browser to view your webpage.</p><h2><strong>Why Learn React JS?</strong></h2><p class="ql-align-justify">React, the popular JavaScript library, offers several exciting reasons for developers to learn it.</p><p class="ql-align-justify">First, React is flexible – once you learn its concepts, you can use it across various platforms to build quality user interfaces. Unlike a framework, React’s library approach allows it to evolve into a remarkable tool.</p><p class="ql-align-justify">Second, React has a great developer experience, making it easier to understand and write code. Third, it benefits from Facebook’s support and resources, ensuring regular bug fixes, enhancements, and documentation updates. Additionally, React’s broader community support, excellent performance, and ease of testing make it an ideal choice for web development.</p><h2>Features of React</h2><p><strong>1. JSX (JavaScript Syntax Extension)</strong>:</p><ul><li>JSX combines HTML and JavaScript, allowing you to embed JavaScript objects within HTML elements.</li><li>It enhances code readability and simplifies UI development.</li></ul><p><strong>Example</strong>:</p><pre class="ql-syntax" spellcheck="false">const name = "GeekforGeeks";
// const ele = &lt;h1&gt;Welcome to {name}&lt;/h1&gt;;
// </pre><p><strong>2. Virtual DOM (Document Object Model)</strong>:</p><ul><li>React uses a virtual DOM, which is an exact copy of the real DOM.</li><li>When there are modifications in the web application, React updates the virtual DOM first and then computes the differences between the real DOM and the virtual DOM.</li><li>This approach minimizes unnecessary re-rendering and improves performance.</li></ul><p><strong>3. One-way Data Binding</strong>:</p><ul><li>React follows one-way data binding, where data flows from parent components to child components.</li><li>Child components cannot directly return data to their parent components, but they can communicate with parents to modify states based on provided inputs.</li></ul><p><strong>4. Performance</strong>:</p><ul><li>React’s virtual DOM and component-based architecture contribute to better performance.</li><li>Separate components allow efficient rendering and faster execution.</li></ul><p><strong>5. Extension</strong>:</p><ul><li>React has a rich ecosystem and supports various extensions.</li><li>Explore tools like&nbsp;<strong>Flux</strong>,&nbsp;<strong>Redux</strong>, and&nbsp;<strong>React Native</strong>&nbsp;for mobile app development and server-side rendering.</li></ul><p><strong>6. Conditional Statements in JSX</strong>:</p><ul><li>JSX allows writing conditional statements directly.</li><li>Display data in the browser based on provided conditions.</li></ul><p><strong>Example</strong>:</p><pre class="ql-syntax" spellcheck="false">const age = 12;
// if (age &gt;= 10) {
//   return &lt;p&gt;Greater than {age}&lt;/p&gt;;
// } else {
//   return &lt;p&gt;{age}&lt;/p&gt;;
// }
// </pre><p><strong>7. Components</strong>:</p><ul><li>React divides web pages into reusable and immutable components.</li><li>Component-based development simplifies code organization and maintenance.</li></ul><h2>Core React Concepts</h2><p>here are some essential concepts to learn:</p><ul><li><strong>Props:</strong>&nbsp;Components can receive data from parent components through props, enabling you to pass information and customize component behavior.</li><li><strong>State:</strong>&nbsp;Components can manage their internal state using the&nbsp;<code>useState</code>&nbsp;hook. This state dictates the component’s appearance and behavior, and updates trigger re-renders.</li><li><strong>Lifecycle Methods:</strong>&nbsp;React provides lifecycle methods like&nbsp;<code>componentDidMount</code>&nbsp;and&nbsp;<code>componentDidUpdate</code>&nbsp;that allow you to perform actions at specific stages of a component’s lifecycle.</li><li><strong>Conditional Rendering:</strong>&nbsp;Control what gets displayed on the screen based on certain conditions using conditional statements within JSX.</li></ul><h2><strong>React Advantages</strong></h2><ul><li><strong>Composable:</strong>&nbsp;We can divide these codes and put them in custom components. Then we can utilize those components and integrate them into one place.</li><li><strong>Declarative:</strong>&nbsp;In ReactJS, the DOM is declarative. We can make interactive UIs by changing the state of the component and ReactJS takes care of updating the DOM according to it.</li><li><strong>SEO Friendly:</strong>&nbsp;ReactJS affects the SEO by giving you a SPA (Single Page Application) which requires Javascript to show the content on the page which can be rendered and indexed.</li><li><strong>Community:</strong>&nbsp;ReactJS has a huge community because of its demand each company wants to work with ReactJS. Companies like Meta, Netflix, etc built on ReactJS.</li><li><strong>Easy to learn:</strong>&nbsp;HTML-like syntax of JSX makes you comfortable with the codes of React, it only requires a basic knowledge of HTML, CSS, and JS fundamentals to start working with it.</li><li>If you want to learn more refer to this article&nbsp;<a href="https://www.geeksforgeeks.org/what-are-the-advantages-of-react-js" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">React JS Advantages</a></li><li><strong>Debugging is Easy:</strong>&nbsp;The debugging of ReactJS is unidirectional which means while designing any app using ReactJS the child components are nested within parent components. So, the data flow is in a single direction it gets more easier to debug errors.</li></ul><h2>React Tutorial</h2><p><br></p><h3>React Basic Concepts</h3><ul><li><a href="https://www.geeksforgeeks.org/reactjs-introduction" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">Introduction</a></li><li><a href="https://www.geeksforgeeks.org/reactjs-importing-exporting" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">Import and Export</a></li><li><a href="https://www.geeksforgeeks.org/reactjs-jsx-introduction" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">JSX Introduction</a></li><li><a href="https://www.geeksforgeeks.org/reactjs-components" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">Components</a></li><li><a href="https://www.geeksforgeeks.org/reactjs-conditional-rendering" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">Conditional Rendering</a></li><li><a href="https://www.geeksforgeeks.org/reactjs-proptypes" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">PropTypes</a></li><li><a href="https://www.geeksforgeeks.org/what-is-prop-drilling-and-how-to-avoid-it" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">Prop Drilling</a></li><li><a href="https://www.geeksforgeeks.org/reactjs-lists" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">React Lists</a></li><li><a href="https://www.geeksforgeeks.org/explain-new-context-api-in-react" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">Context API</a></li><li><a href="https://www.geeksforgeeks.org/introduction-to-react-redux" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">React Redux</a></li></ul><h3>React Hooks</h3><ul><li><a href="https://www.geeksforgeeks.org/reactjs-hooks" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">Hooks Introduction</a></li><li><a href="https://www.geeksforgeeks.org/reactjs-usestate-hook" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">useState Hook</a></li><li><a href="https://www.geeksforgeeks.org/reactjs-useeffect-hook" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">useEffect Hook</a></li><li><a href="https://www.geeksforgeeks.org/react-js-useref-hook" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">useRef Hook</a></li><li><a href="https://www.geeksforgeeks.org/react-js-usememo-hook" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">useMemo Hook</a></li><li><a href="https://www.geeksforgeeks.org/reactjs-usecontext-hook" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">useContext Hook</a></li></ul><h3><strong>React DOM Events</strong></h3><ul><li><a href="https://www.geeksforgeeks.org/react-js-events" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">React Events Introduction</a></li><li><a href="https://www.geeksforgeeks.org/what-is-onclickcapture-event-in-reactjs" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">onclickcapture Event</a></li><li><a href="https://www.geeksforgeeks.org/react-onmousedown-event" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">onMouseDown Event</a></li><li><a href="https://www.geeksforgeeks.org/react-ondoubleclick-event" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">onDoubleClick Event</a></li><li><a href="https://www.geeksforgeeks.org/react-onsubmit-event" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">onSubmit Event</a></li><li><a href="https://www.geeksforgeeks.org/react-onscroll-event" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">onScroll Event</a></li><li><a href="https://www.geeksforgeeks.org/react-onblur-event" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">onBlur Event</a></li></ul><h3><strong>Lifecycle of Components</strong></h3><ul><li><a href="https://www.geeksforgeeks.org/reactjs-lifecycle-components" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">Introduction to lifecycle of components</a></li><li><a href="https://www.geeksforgeeks.org/react-js-constructor-method" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">constructor</a></li><li><a href="https://www.geeksforgeeks.org/react-js-render-method" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">render</a></li><li><a href="https://www.geeksforgeeks.org/reactjs-componentdidmount-method" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">componentDidMount</a></li><li><a href="https://www.geeksforgeeks.org/reactjs-componentwillunmount-method" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">componentWillUnmount</a></li><li><a href="https://www.geeksforgeeks.org/reactjs-componentdidcatch-method" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">componentDidCatch</a></li><li><a href="https://www.geeksforgeeks.org/reactjs-componentdidupdate-method" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">componentDidUpdate</a></li><li><a href="https://www.geeksforgeeks.org/reactjs-shouldcomponentupdate-method" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">shouldComponentUpdate</a></li></ul><h3>Important React Packages</h3><ul><li><a href="https://www.geeksforgeeks.org/introduction-to-react-redux" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">Redux</a></li><li><a href="https://www.geeksforgeeks.org/react-material-ui" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">Material UI</a></li><li><a href="https://www.geeksforgeeks.org/react-bootstrap" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">react-bootstrap</a></li><li><a href="https://www.geeksforgeeks.org/tailwind-css" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">Tailwind</a></li><li><a href="https://www.geeksforgeeks.org/framer-motion-introduction-and-installation" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">Framer Motion</a></li></ul><h3>React Interview Questions</h3><ul><li><a href="https://www.geeksforgeeks.org/reactjs-interview-questions-and-answers" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">Beginner Level Interview Questions (2024)</a></li><li><a href="https://www.geeksforgeeks.org/reactjs-interview-questions-and-answers-intermediate-level" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">Intermediate Level Interview Questions (2024)</a></li><li><a href="https://www.geeksforgeeks.org/reactjs-interview-question-and-answers-advance-level" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">Advanced Level Interview Questions (2024)</a></li><li><a href="https://www.geeksforgeeks.org/7-most-asked-reactjs-interview-questions-answers" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">7 Most Asked ReactJS Interview Questions</a></li></ul><h3>React Online Quizs</h3><ul><li><a href="https://www.geeksforgeeks.org/react-js-quiz-set-1" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">Set-1</a></li><li><a href="https://www.geeksforgeeks.org/react-js-quiz-set-2" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">Set-2</a></li><li><a href="https://www.geeksforgeeks.org/react-js-quiz-set-3" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">Set-3</a></li><li><a href="https://www.geeksforgeeks.org/reactjs-quiz-set-4" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">Set-4</a></li></ul><h3>React Online Practice Exercise</h3><p>Embark on your React learning journey with our online practice portal. Start by selecting quizzes tailored to your skill level. Engage in hands-on coding exercises, receive real-time feedback, and monitor your progress. With our user-friendly platform, mastering React becomes an enjoyable and personalized experience.</p><p>Elevate your coding expertise by going through our carefully curated&nbsp;<a href="https://www.geeksforgeeks.org/practice-react-online" rel="noopener noreferrer" target="_blank" style="color: var(--article-tags-color);">Free Online React Quiz.</a></p><h3>React Complete References</h3>
// // 