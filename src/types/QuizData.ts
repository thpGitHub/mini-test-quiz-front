export type QuizData = {
  name: string
  rounds: {
    questions: string
    reponses: string[]
    corrects: number[]
  }[]
  categories: string[]
}
