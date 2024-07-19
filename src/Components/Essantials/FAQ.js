import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const faqData = [
  {
    question: "What is AlphaLearn?",
    answer: "AlphaLearn is a platform for learning coding and reading articles related to various technologies.",
  },
  {
    question: "What will the future of AlphaLearn?",
    answer: "We see AlphaLearn at a global stage. Further, we will integrate coding IDE in our website as well as aim to provide a single display for all coding profiles.",
  },
  {
    question: "How can one connect to us?",
    answer:    <>
    One can visit our <Link to='/contact' className="text-blue-500 underline">Contact</Link> section and provide the necessary details. Our team will get in touch with you soon.
  </>,
  },
  // Add more FAQs as needed
];

const FaqItem = ({ question, answer, isOpen, toggle }) => {
  return (
    <div className="w-full mb-4">
      <button
        className="w-full text-left text-lg  text-gray-200 bg-gray-800 px-4 py-2 rounded-md focus:outline-none"
        onClick={toggle}
      >
        {question}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <p className="text-gray-300 text-left mt-2 px-4">{answer}</p>
      </div>
    </div>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id='faq' className="container mx-auto min-w-full  my-4  p-4 bg-gray-900">
      <h1 className="text-3xl `sm`:text-lg font-bold text-white mb-8 text-center">
        Frequently Asked Questions
      </h1>
      <div className="max-w-3xl w-full  mx-auto">
        {faqData.map((item, index) => (
          <FaqItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            toggle={() => toggleFaq(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Faq;
