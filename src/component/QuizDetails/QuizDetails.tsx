import React, {useContext, useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import './quizDetails.css'

import Alert, {AlertColor} from '@mui/material/Alert'
import useFetchQuizs from '../../hooks/useFetchQuizs'
import {QuizContext} from '../../context/QuizContext'

// type QuizListProps = {
//   quizs: {
//     _id: string
//     rounds: {
//       questions: string
//       responses: string[]
//       corrects: number[]
//     }[]
//     categories: string[]
//     name: string
//   }[]
// }
interface QuizData {
  name: string
  rounds: {
    questions: string
    responses: string[]
    corrects: number[]
  }[]
  categories: string[]
}

const QuizDetails = () => {
  // const {quizs} = useFetchQuizs()
  // const {quizs} = useContext(QuizContext)
  const [quizs, setQuizs] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showAlert, setShowAlert] = useState<AlertColor | undefined>()
  const [messageAlert, setMessageAlert] = useState('')
  const [score, setScore] = useState(0)

  const fetchQuizs = async () => {
    try {
      const response = await fetch('http://localhost:3000/quiz')
      if (!response.ok) {
        throw new Error('Failed to fetch quizs')
      }
      const data: QuizData = await response.json()
      setQuizs(data)
    } catch (err) {
      setError((err as Error).message)
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log('in useeffect')
    fetchQuizs()
  }, [])

  const navigate = useNavigate()
  const {id} = useParams()

  if (!quizs) {
    return <div>Loading...</div>
  }

  const quizName = quizs[Number(id)]?.name
  const questionDescription =
    quizs[Number(id)]?.rounds[currentQuestion]?.questions

  // const responsesList: string[] = quizs[Number(id)].rounds[currentQuestion].responses
  // @ts-ignore
  const responsesList: string[] =
    quizs[Number(id)]?.rounds[currentQuestion]?.reponses
  console.log('responsesList', responsesList)
  console.log('Quizs under responsesList', quizs)

  const indexGoodResponse =
    quizs[Number(id)]?.rounds[currentQuestion]?.corrects[0]

  const numberOfQuestions = quizs[Number(id)]?.rounds.length

  console.log(quizs)
  console.log('correct', indexGoodResponse)

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
      <div className="quiz-showAlert-container">
        {showAlert && (
          <Alert severity={showAlert} className="quiz-details-alert">
            {messageAlert}
          </Alert>
        )}
      </div>

      {/* {quizs && ( */}
      <>
        <Link to={'/'} className="quiz-details-link">
          <button className="quiz-details-button">Liste des Quizs</button>
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
      </>
      {/* )} */}
    </>
  )
}

export default QuizDetails
