import clericLogo from './assets/clericLogo.svg';
import './OutputScreen.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import TypeWriterText from './TypewriterText';

function OutputScreen() {
    const [question, setQuestion] = useState('');
    const [facts, setFacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
          const response = await fetch('https://backend-web-7mlc.onrender.com/get_question_and_facts', {
            method: 'GET',
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
    
          const data = await response.json();
          setQuestion(data.question);
          setFacts(data.facts);
        } catch (error) {
          console.error('Error:', error);
        } finally {
            setLoading(false);
        }
      };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array to run only once when the component mounts

    return (
    <div className="Input-Page">
      <header className="Input-Page-Header">
        <img src={clericLogo} className="App-Logo" alt="logo" />
        <h2 className="Assignment">Take Home Assignment</h2>
        <h2 className="Top-Name">Brandon Chin</h2>
      </header>
      <body className="Input-Page-Body">
        <div className="Square-Div">
          <div className="TypeWriter-Container">
            <TypeWriterText text="Here are the facts!" className="Welcome-Text-Container" />
          </div>
          <div className="Response-Container">
          {loading ? (
              <p>Loading...</p>
            ) : (
              <React.Fragment>
                <h1 className="Question">Question: {question}</h1>
                <ul className="List">
                  {facts.map((fact, index) => (
                    <li key={index} className="Facts">{fact}</li>
                  ))}
                </ul>
              </React.Fragment>
            )}
          </div>
        </div>
      </body>
    </div>
    );
}

export default OutputScreen;