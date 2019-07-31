# AlgorithmMastery

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.

## Development Setup:

Generate `environment.ts` file under `src/environments` using the following template:
```javascript
export const environment = {
  production: false,
  accessToken: 'Bearer token generated from backend',
  allQuestionsEP: 'http://localhost:8000/api/all-questions/',
  oneQuestionEP: 'http://localhost:8000/api/one-question/',
};
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Production

TODO.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
