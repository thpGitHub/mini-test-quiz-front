import React, {useState} from 'react'
import './createQuiz.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

interface QuizData {
  name: string
  rounds: {
    questions: string
    reponses: string[]
    corrects: number[]
  }[]
  categories: string[]
}

const NewQuizForm: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizData>({
    name: '',
    rounds: [
      {
        questions: '',
        reponses: ['', ''],
        corrects: [0],
      },
    ],
    categories: [],
  })

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const fieldName: string = e.target.name
    const fieldValue: string = e.target.value

    if (fieldName === 'name') {
      setQuizData(prevQuizData => ({
        ...prevQuizData,
        name: fieldValue,
      }))
    }

    if (fieldName === 'question') {
      setQuizData(prevQuizData => ({
        ...prevQuizData,
        rounds: [
          {
            ...prevQuizData.rounds[0],
            questions: fieldValue,
          },
        ],
      }))
    }

    if (fieldName === 'rounds[0].reponses[0]') {
      console.log('fieldResponse', fieldName)

      setQuizData(prevQuizData => ({
        ...prevQuizData,
        rounds: [
          {
            ...prevQuizData.rounds[0],
            reponses: [fieldValue, prevQuizData.rounds[0].reponses[1]],
          },
        ],
      }))
    }
    if (fieldName === 'rounds[0].reponses[1]') {
      console.log('fieldResponse', fieldName)

      setQuizData(prevQuizData => ({
        ...prevQuizData,
        rounds: [
          {
            ...prevQuizData.rounds[0],
            reponses: [prevQuizData.rounds[0].reponses[0], fieldValue],
          },
        ],
      }))
    }

    if (fieldName === 'rounds[0].corrects') {
      setQuizData(prevQuizData => ({
        ...prevQuizData,
        rounds: [
          {
            ...prevQuizData.rounds[0],
            corrects: [+fieldValue],
          },
        ],
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // await axios.post('http://localhost:3000/create', quizData) // Adjust the API endpoint as per your setup
      await axios.post(
        'https://mini-test-quiz-back-production.up.railway.app/create',
        quizData,
      )
      alert('Quiz created successfully!')

      setQuizData({
        name: '',
        rounds: [
          {
            questions: '',
            reponses: ['', ''],
            corrects: [0],
          },
        ],
        categories: [],
      })
    } catch (error) {
      console.error('Failed to create quiz:', error)
      alert('Failed to create quiz. Please try again later.')
    }
  }

  return (
    <>
      <Link to={'/'} className="quiz-details-link">
        <button className="quiz-details-button">Liste des Quizs</button>
      </Link>
      <form className="quiz-form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Quiz Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={quizData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        {quizData.rounds.map((round, roundIndex) => (
          <div key={roundIndex}>
            <h3>Round {roundIndex + 1}</h3>

            <div>
              <label htmlFor={`rounds[${roundIndex}].questions`}>
                Question:
              </label>
              <input
                type="text"
                id={`rounds[${roundIndex}].questions`}
                name="question"
                value={quizData.rounds[roundIndex].questions}
                onChange={handleInputChange}
                required
              />
            </div>

            {round.reponses.map((response, responseIndex) => (
              <div key={responseIndex}>
                <label
                  htmlFor={`rounds[${roundIndex}].reponses[${responseIndex}]`}
                >
                  Response {responseIndex + 1}:
                </label>
                <input
                  type="text"
                  id={`rounds[${roundIndex}].reponses[${responseIndex}]`}
                  name={`rounds[${roundIndex}].reponses[${responseIndex}]`}
                  value={response}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ))}

            <div>
              <label htmlFor={`rounds[${roundIndex}].corrects`}>
                Correct Response:
              </label>
              <select
                id={`rounds[${roundIndex}].corrects`}
                name={`rounds[${roundIndex}].corrects`}
                value={round.corrects[0]}
                onChange={handleInputChange}
              >
                {round.reponses.map((_, index) => (
                  <option key={index} value={index}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button type="submit">Create Quiz</button>
            </div>
          </div>
        ))}
      </form>
    </>
  )
}

export default NewQuizForm
