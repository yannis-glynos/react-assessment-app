import { useState } from 'react';
import FetchAPIData from "../components/fetchapidata"
import QuizQuestion from "../components/quiz_question";

function QuizPage() {
  const { data, loading, error } = FetchAPIData('https://opentdb.com/api.php?amount=10&category=11&type=multiple', "quiz");
  const [correct_answers, setCorrectAnswers] = useState(0);
  const [question_number, setQuestionNumber] = useState(0);
  const handleAnswerSubmit = (iscomplete, correct_answer) => {
    if(iscomplete === correct_answer){
      setCorrectAnswers(correct_answers + 1);
      setQuestionNumber(question_number + 1);
    }
    else if(iscomplete !== correct_answer){
      if(iscomplete !== null){
        setQuestionNumber(question_number + 1);
        alert('The answer you selected is incorrect \n The correct answer is ' + correct_answer);
      }
    }
  };
  
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-icon"></div>
      </div>
    );
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (data) {
    var question = <QuizQuestion 
                    question={data.results[question_number]} 
                    index={question_number} 
                    onAnswerSubmit={handleAnswerSubmit}/>;
    
    return (
      (question_number < 10 ? 
          <div className="container-inner col">
            <h1>
              Movies Quiz
            </h1>
            <h2><span>Currently on Question {question_number + 1} of {data.results.length}</span>&#9;&#9;<span>Correct Answers: {correct_answers}</span></h2>
            <div className="question-container">
            {Array.isArray(data.results) ? (
              (question)
            ) : (
              <h1>
                There has been a problem getting the questions, please refresh the page to find a new quiz
              </h1>
            )}
            </div>
          </div>
        :
          <div className='quiz-end'>
            <h1>
              You have completed the quiz!
            </h1>
            <h2>
              Your final score is {correct_answers} / {data.results.length}
            </h2>
            <h2>
              {correct_answers / data.results.length > 0.4 ? 
                <p className='quiz-well-done'>
                  Well done!
                </p>
              :
                <p className='quiz-unfortunate'>
                  Better luck next time
                </p>}
            </h2>
          </div>
      )
      
    );
  }
}

export default QuizPage;