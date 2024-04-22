import clericLogo from './assets/clericLogo.svg';
import './InputScreen.css';
import { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom'; 
import TypeWriterText from './TypewriterText';

function InputScreen() {
  const questionId = useId();
  const callLogListId = useId();
  const [question, setQuestion] = useState('');
  const [callLogs, setCallLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://backend-web-7mlc.onrender.com/submit_question_and_documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question,
          documents: callLogs,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      console.log('Data submitted successfully');
      setLoading(false);
      navigate('/output')

    } catch (error) {
      console.log('Error:', error);
    }
  };

  const checkIfList = (inputString) => {
    const trimmedInput = String(inputString).trim();
    const items = trimmedInput.split(',');
    if ((!inputString.includes('[')) || (!inputString.includes(']'))) {
      return false
    }
    return items.every(item => item.trim() !== '');
  }

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
            <TypeWriterText text="Welcome!" className="Welcome-Text-Container" />
          </div>
          <div className="Question-Container">
            <label htmlFor={questionId} className="Label-Input">
              Please input your question!
            </label>
            <input 
              id={questionId}
             className="Question-Input" 
             type="text" 
             placeholder="Enter your question..."
             onChange={(e) => setQuestion(e.target.value)} 
             />
          </div>

          <div className="Logs-Container">
            <label htmlFor={callLogListId} className="Label-Input">
              Please input your call logs as a list eg. [item1, item2]!
            </label>
            <textarea 
              id={callLogListId} 
              className="Logs-Input" 
              placeholder="Enter your call logs..."
              onChange={(e) => setCallLogs(e.target.value)}/>
          </div>

          {question && callLogs && typeof question === 'string' && checkIfList(callLogs) && (
            <button 
              onClick={handleSubmit}
              className="Submit-Button"
            >Submit</button>
          )}
          {loading && <p className="Loading-Text">Loading...</p>}
        </div>
      </body>
    </div>
  );
}

export default InputScreen;
