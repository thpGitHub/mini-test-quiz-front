import React, {useState, ChangeEvent} from 'react'
import axios from 'axios'

interface QuizData {
  name: string
  rounds: {
    questions: string
    responses: string[]
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
        responses: ['', ''],
        corrects: [0],
      },
    ],
    categories: [],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = e.target.value
    console.log("e.target.name",e.target.name);
    
    setQuizData(prevQuizData => ({
      ...prevQuizData,
      name: fieldName,
    }))
  }
  //   const handleInputChange = (
  //     e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  //     roundIndex: number,
  //     responseIndex?: number
  //   ) => {
  //     const { name, value } = e.target;

  //     if (name.startsWith('rounds[')) {
  //       const [, field, index, subfield] = name.match(/rounds\[(\d+)\]\.(\w+)\[(\d+)\]\.(\w+)/) || [];
  //       if (field && index && subfield) {
  //         setQuizData((prevData) => ({
  //           ...prevData,
  //           rounds: prevData.rounds.map((round, i) => {
  //             if (i === Number(index)) {
  //               return {
  //                 ...round,
  //                 [field as keyof typeof round]: round[field as keyof typeof round].map((sub, j) =>
  //                   j === Number(subfield) ? value : sub
  //                 ),
  //               };
  //             }
  //             return round;
  //           }),
  //         }));
  //       }
  //     } else {
  //       setQuizData((prevData) => ({ ...prevData, [name]: value }));
  //     }
  //   };

  const handleAddRound = () => {
    setQuizData(prevData => ({
      ...prevData,
      rounds: [
        ...prevData.rounds,
        {
          questions: '',
          responses: ['', ''],
          corrects: [0],
        },
      ],
    }))
  }

  const handleRemoveRound = (roundIndex: number) => {
    setQuizData(prevData => ({
      ...prevData,
      rounds: prevData.rounds.filter((_, i) => i !== roundIndex),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await axios.post('/api/quizzes', quizData) // Adjust the API endpoint as per your setup
      alert('Quiz created successfully!')
      // Reset form or redirect to a different page
    } catch (error) {
      console.error('Failed to create quiz:', error)
      alert('Failed to create quiz. Please try again later.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Quiz Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={quizData.name}
          onChange={handleInputChange}
        />
      </div>

      {quizData.rounds.map((round, roundIndex) => (
        <div key={roundIndex}>
          <h3>Round {roundIndex + 1}</h3>

          <div>
            <label htmlFor={`rounds[${roundIndex}].questions`}>Question:</label>
            <input
              type="text"
              id={`rounds[${roundIndex}].questions`}
              name={`rounds[${roundIndex}].questions`}
              value={round.questions}
              //   onChange={(e) => handleInputChange(e, roundIndex)}
            />
          </div>

          {round.responses.map((response, responseIndex) => (
            <div key={responseIndex}>
              <label
                htmlFor={`rounds[${roundIndex}].responses[${responseIndex}]`}
              >
                Response {responseIndex + 1}:
              </label>
              <input
                type="text"
                id={`rounds[${roundIndex}].responses[${responseIndex}]`}
                name={`rounds[${roundIndex}].responses[${responseIndex}]`}
                value={response}
                // onChange={(e) => handleInputChange(e, roundIndex, responseIndex)}
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
              //   onChange={(e) => handleInputChange(e, roundIndex)}
            >
              {round.responses.map((_, index) => (
                <option key={index} value={index}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>

          <button type="button" onClick={() => handleRemoveRound(roundIndex)}>
            Remove Round
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddRound}>
        Add Round
      </button>

      <button type="submit">Create Quiz</button>
    </form>
  )
}

export default NewQuizForm
