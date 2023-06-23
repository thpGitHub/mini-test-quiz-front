import {useState, useEffect} from 'react'

interface QuizData {
  name: string
  rounds: {
    questions: string
    responses: string[]
    corrects: number[]
  }[]
  categories: string[]
}

const useFetchQuizs = () => {
  const [quizs, setQuizs] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchQuizs = async () => {
      try {
        // const response = await fetch('http://localhost:3000/quiz')
        const response = await fetch('https://mini-test-quiz-back-production.up.railway.app/quiz')
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

    fetchQuizs()
  }, [])

  return {quizs, isLoading, error, setQuizs}
}

export default useFetchQuizs
