import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {fetchQuizs} from '../services/quizService'
import {AlertColor} from '@mui/material'
import {QuizData} from '../types/QuizData'

const useQuizDetails = (id: string | undefined) => {
  const [quizs, setQuizs] = useState<QuizData[] | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  // const [error, setError] = useState<string | null>(null)

  const [currentQuestion, setCurrentQuestion] = useState(0)

  const [showAlert, setShowAlert] = useState<AlertColor | undefined>()
  const [messageAlert, setMessageAlert] = useState('')
  const [score, setScore] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuizs()
        setQuizs(data)
      } catch (err) {
        // setError((err as Error).message)
        setShowAlert('error')
        setMessageAlert('Il y a un problème pour récupérer le quiz demandé')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const quizName = quizs?.[Number(id)]?.name

  const questionDescription =
    quizs?.[Number(id)]?.rounds[currentQuestion]?.questions

  const responsesList = quizs?.[Number(id)]?.rounds[currentQuestion]?.reponses

  const indexGoodResponse =
    quizs?.[Number(id)]?.rounds[currentQuestion]?.corrects[0]

  const numberOfQuestions = quizs?.[Number(id)]?.rounds.length

  const isGoodResponse = (indexResponse: number): boolean => {
    return indexResponse === indexGoodResponse
  }

  const isLastQuestion = (): boolean => {
    // return currentQuestion === numberOfQuestions - 1
    return currentQuestion === (numberOfQuestions ?? 0) - 1
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

  return {
    // error,
    quizName,
    isLoading,
    showAlert,
    messageAlert,
    responsesList,
    handleResponse,
    currentQuestion,
    questionDescription,
  }
}

export default useQuizDetails
