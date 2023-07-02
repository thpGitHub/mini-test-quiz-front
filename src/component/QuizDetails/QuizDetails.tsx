import './quizDetails.css'
import {Link, useParams} from 'react-router-dom'
import useQuizDetails from '../../hooks/useQuizDetails'

import Alert from '@mui/material/Alert'

const QuizDetails = () => {
  const {id} = useParams()
  const {
    quizName,
    isLoading,
    showAlert,
    messageAlert,
    responsesList,
    handleResponse,
    currentQuestion,
    questionDescription,
  } = useQuizDetails(id)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="quiz-showAlert-container">
        {showAlert && <Alert severity={showAlert}>{messageAlert}</Alert>}
      </div>

      <div className="quiz-details-container">
        <Link to={'/'} className="quiz-details-link">
          <button className="quiz-details-button">
            Retour liste des Quizs
          </button>
        </Link>
        <h2 className="quiz-details-heading">{quizName}</h2>
        <p className="quiz-details-question">
          Question {currentQuestion + 1} : {questionDescription}
        </p>
        {responsesList?.map((response, index) => {
          return (
            <button
              onClick={() => handleResponse(index)}
              className="quiz-details-response-button"
              key={index}
            >
              {response}
            </button>
          )
        })}
      </div>
    </>
  )
}

export default QuizDetails
