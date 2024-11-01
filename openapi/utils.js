const sortObject = require("./sort_object");

function responseSchema({ status, data, message = "", token, errors }) {
  const schema = { message, status };
  if (data) schema.data = data;
  if (errors) schema.errors = errors;
  if (token) schema.token = token;
  return sortObject(schema);
}

function responseSchema200(message, data) {
  return responseSchema({
    status: 200,
    message,
    data,
  });
}

function ModelsFetched(model, data) {
  return responseSchema200(`${model} fetched`, [data]);
}

function ModelCreated(model, data) {
  return responseSchema200(`${model} created`, data);
}

function ModelFetched(model, data) {
  return responseSchema200(`${model} fetched`, data);
}

function ModelUpdated(model, data) {
  return responseSchema200(`${model} updated`, data);
}

function ModelDeleted(model) {
  return responseSchema({
    status: 200,
    message: `${model} deleted`,
  });
}

function ModelNotFound(model) {
  return responseSchema({
    status: 404,
    message: `${model} not found`,
  });
}

function InvalidId(model) {
  return responseSchema({
    message: `invalid ${model} id`,
    status: 406,
  });
}

function ValueRequired(data) {
  const errors = {};
  let message = "";

  Object.keys(data).forEach((key) => {
    if (data[key]) {
      errors[key] = `${key} is required`;
      message += `${errors[key]}, `;
    }
  });

  message = message.replace(/, $/, "");

  return responseSchema({ message, status: 400, errors });
}

function makeDB(data) {
  return {
    id: "62abe4354f232",
    ...data,
    createdAt: "2024-09-01T01:41:42.667Z",
    updatedAt: "2024-09-01T01:41:42.667Z",
  };
}

module.exports = {
  responseSchema,
  responseSchema200,
  ModelsFetched,
  ModelCreated,
  ModelFetched,
  ModelUpdated,
  ModelDeleted,
  ModelNotFound,
  InvalidId,
  ValueRequired,
  makeDB,
};
