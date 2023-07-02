export type QuizData = {
  name: string
  rounds: {
    questions: string
    responses: string[]
    corrects: number[]
  }[]
  categories: string[]
}
