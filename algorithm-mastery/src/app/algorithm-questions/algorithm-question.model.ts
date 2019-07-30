export interface AlgorithmQuestionModel {
  title: string;
  source: string;
  topic: string;
  tags: string[];
  techniques: string[];
  input: string;
  output: string;
  solution: string;
  timeComplexity: string;
  spaceComplexity: string;
  note: string;
}

export function getEmptyQuestion() {
  return {
    title: '',
    source: '',
    topic: '',
    tags: [],
    techniques: [],
    input: '',
    output: '',
    solution: '',
    timeComplexity: '',
    spaceComplexity: '',
    note: '',
  };
}
