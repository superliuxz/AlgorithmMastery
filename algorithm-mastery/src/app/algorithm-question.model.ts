export class AlgorithmQuestionModel {
  constructor(
    public title: string,
    public source: string,
    public topics: string[],
    public tags: string[],
    public techniques: string[],
    public input: string,
    public output: string,
    public solution: string,
    public runtime: string[],
    public note: string = ''
  ) {}
}
