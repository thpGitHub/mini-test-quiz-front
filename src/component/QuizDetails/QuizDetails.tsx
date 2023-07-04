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
      <div className="quiz-details-showAlert-container" aria-live="assertive">
        {showAlert && <Alert severity={showAlert}>{messageAlert}</Alert>}
      </div>

      <nav className='quiz-details-nav'>
        <Link to={'/'} className="quiz-details-nav-link">
          <button className="quiz-details-nav-button">
            Retour liste des Quizs
          </button>
        </Link>
      </nav>

      <div className="quiz-details-container">
        {quizName && (
          <>
            <h2 className="quiz-details-heading">{quizName}</h2>
            <p className="quiz-details-question">
              <span className="quiz-details-question-number">
                Question {currentQuestion + 1} :{' '}
              </span>
              {questionDescription}
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
          </>
        )}
      </div>
    </>
  )
}

export default QuizDetails
