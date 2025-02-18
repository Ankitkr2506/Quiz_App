import React, { useState, useEffect } from 'react';
import { Data } from './Data'; 

const Quiz = () => {
  const [data, setData] = useState(Data);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); 
  const [quizFinished, setQuizFinished] = useState(false); 
  const [attempts, setAttempts] = useState(1); 
  const [bestScore, setBestScore] = useState(0); 
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState(''); // New state for tracking selected option

  useEffect(() => {
    if (timeLeft > 0 && index < data.length && !quizFinished) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId); 
    } else if (timeLeft === 0) {
      next();
    }
  }, [timeLeft, index, quizFinished]);

  const next = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
      setTimeLeft(30); 
      setUserAnswer('');
      setSelectedOption(''); // Reset selected option for new question
    } else {
      setQuizFinished(true); 
      if (score > bestScore) {
        setBestScore(score);
      }
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setScore(0);
    setTimeLeft(30);
    setQuizFinished(false); 
    setAttempts(attempts + 1); 
    setUserAnswer('');
    setSelectedOption('');
  };

  const handleInput = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue); // Track selected option
    if (selectedValue === data[index].ans) {
      setScore(score + 1);
    }
  };

  const handleIntegerInput = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmitInteger = () => {
    if (userAnswer === data[index].ans) {
      setScore(score + 1);
    }
    next();
  };

  const handleLogout = () => {
    setAttempts(1);
    setBestScore(0);
    window.location.href = '/'; 
  };

  return (
    <div className='container'>
      {!quizFinished ? (
        <div className='quiz'>
          <h1>Q : {data[index].q}</h1>
          {data[index].a ? (
            <>
              <div className='option'>
                <input 
                  name='select' 
                  type='radio' 
                  onChange={handleInput} 
                  className='checkedValue' 
                  value={data[index].a}
                  checked={selectedOption === data[index].a}
                />
                <p>A : {data[index].a}</p>
              </div>
              <div className='option'>
                <input 
                  name='select' 
                  type='radio' 
                  onChange={handleInput} 
                  className='checkedValue' 
                  value={data[index].b}
                  checked={selectedOption === data[index].b}
                />
                <p>B : {data[index].b}</p>
              </div>
              <div className='option'>
                <input 
                  name='select' 
                  type='radio' 
                  onChange={handleInput} 
                  className='checkedValue' 
                  value={data[index].c}
                  checked={selectedOption === data[index].c}
                />
                <p>C : {data[index].c}</p>
              </div>
              <div className='option'>
                <input 
                  name='select' 
                  type='radio' 
                  onChange={handleInput} 
                  className='checkedValue' 
                  value={data[index].d}
                  checked={selectedOption === data[index].d}
                />
                <p>D : {data[index].d}</p>
              </div>
            </>
          ) : (
            <div className='integer-input'>
            <input 
              type="number"
              value={userAnswer} 
              onChange={handleIntegerInput} 
              placeholder="Your Answer"
              min="0"
              max="1000"
              className="no-spin"
            />
            <button onClick={handleSubmitInteger}>Submit</button>
          </div>
          )}
          <div className='timer'>
            <p>Time Left: {timeLeft}s</p>
          </div>
          {data[index].a && <button id='next' onClick={next} disabled={!selectedOption}>Next</button>}
        </div>
      ) : (
        <div className='score'>
          <h1>Your Score: {score}/{data.length}</h1>
          <h2>Attempts: {attempts}</h2>
          <h2>Best Score: {bestScore}</h2>
          <button onClick={resetQuiz}>Try Again</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;