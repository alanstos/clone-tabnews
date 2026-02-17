import {
  InternalServerError,
  MethodNotAllwedError,
  ValidationError,
  NotFoundError,
} from "infra/errors";

function onNoMatchHandler(req, resp) {
  const methodError = new MethodNotAllwedError();
  resp.status(methodError.statusCode).json(methodError);
}

function onErrorHandler(error, req, response) {
  if (error instanceof ValidationError || error instanceof NotFoundError) {
    return response.status(error.statusCode).json(error);
  }

  const publicErrorObject = new InternalServerError({
    cause: error,
    statusCode: error.statusCode,
  });
  console.log("\n Erro dentro do catch do onErrorHandler:");
  console.log(publicErrorObject);
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

const controller = {
  errorHandlers: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandler,
  },
};

export default controller;
