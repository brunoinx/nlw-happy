import { ErrorRequestHandler } from "express";
import { ValidationError } from 'yup';

/*
Formato de como será retornado os erros:

"nome da chave": "Erros associados a ela e seu valor" 
*/
interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });

    return response.status(400).json({ Message: "Validation fails.", errors });
  }

  console.log(error);

  return response.status(500).json({ Message: 'Internal server error.' });
};

export default errorHandler;