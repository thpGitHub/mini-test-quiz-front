import React, {useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'

import Alert, {AlertColor} from '@mui/material/Alert'

type QuizListProps = {
  quizs: {
    _id: string
    rounds: {
      questions: string
      responses: string[]
      corrects: number[]
    }[]
    categories: string[]
    name: string
  }[]
}

const QuizDetails = ({quizs}: QuizListProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showAlert, setShowAlert] = useState<AlertColor | undefined>()
  const [messageAlert, setMessageAlert] = useState('')
  const [score, setScore] = useState(0)

  const navigate = useNavigate()
  const {id} = useParams()

  const quizName = quizs[Number(id)].name
  const questionDescription =
    quizs[Number(id)].rounds[currentQuestion].questions
  const responsesList = quizs[Number(id)].rounds[currentQuestion].responses
  const indexGoodResponse =
    quizs[Number(id)].rounds[currentQuestion].corrects[0]
  const numberOfQuestions = quizs[Number(id)].rounds.length

  console.log(quizs)
  console.log('correct', indexGoodResponse)

  if (!quizs) {
    return <div>Loading...</div>
  }

  const isGoodResponse = (indexResponse: number): boolean => {
    return indexResponse === indexGoodResponse
  }

  const isLastQuestion = (): boolean => {
    return currentQuestion === numberOfQuestions - 1
  }

  const handleResponse = (indexResponse: number) => {
    const isGood = isGoodResponse(indexResponse)
    const isLast = isLastQuestion()

    if (isGood) {
      setShowAlert('success')
      setMessageAlert('Bonne réponse')
      setScore(prevScore => prevScore + 1) 

      setTimeout(() => {
        setShowAlert(undefined)
      }, 1500)

      if (isLast) {
        setShowAlert('info')
        setMessageAlert(
          `Bravo, dernière question. Retour à la liste des Quizs. SCORE du Quiz = ${score}`,
        )

        setTimeout(() => {
          navigate('/')
        }, 3000)

      } else {
        setCurrentQuestion(prevQuestion => prevQuestion + 1)
      }
    } else {
      setShowAlert('error')
      setMessageAlert('Mauvaise réponse')
    }
  }

  return (
    <>
      {/* {showAlert && <Alert severity="error">This is an error alert — check it out!</Alert>} */}
      {showAlert && <Alert severity={showAlert}>{messageAlert}</Alert>}

      <Link to={'/'}>
        <button>Liste des Quizs</button>
      </Link>
      <h2>{quizName}</h2>
      <p>
        Question {currentQuestion + 1} : {questionDescription}
      </p>
      {responsesList.map((response, index) => {
        return (
          <button onClick={() => handleResponse(index)} key={index}>
            {response}
          </button>
        )
      })}
    </>
  )
}

export default QuizDetails
