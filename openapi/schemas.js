const sortObject = require("./sort_object");
const {
  responseSchema,
  ModelsFetched,
  ModelCreated,
  ModelFetched,
  ModelUpdated,
  ModelDeleted,
  ModelNotFound,
  InvalidId,
  ValueRequired,
  makeDB,
} = require("./utils");

const Login = {
  email: "johnstone@gmail.com",
  password: "Password@1",
};

const User = {
  ...Login,
  firstName: "John",
  lastName: "Stone",
  idNumber: "2018/251501",
  isStudent: true,
  phoneNumber: "08131542720",
  dateOfBirth: "1990-05-15",
  placeOfBirth: "New York City",
  education: {
    university: "New York University",
    degree: "Bachelor of Engineering",
    startDate: "2018-01-01",
    endDate: "2022-06-30",
    city: "New York City",
  },
};

const User_d = makeDB({
  ...User,
});

const Course = {
  class: "100L",
  code: "Engr 101",
  status: "normal",
};

const Course_d = makeDB({
  ...Course,
});

const schemas = {
  Login: Login,
  LoginSuccess: responseSchema({
    status: 200,
    data: sortObject(User),
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDNhMmM2YjFhYTk3OGYxNzRjZjcyOSIsInR5cGUiOiJhZG1pbiIsImVtYWlsIjoicHJtcHNtYXJ0QG1haWxpbmF0b3IuY29tIiwiaWF0IjoxNzI1MTQ1Nzk4LCJleHAiOjE3MjUxODg5OTh9.HbnQle5FVtGbr3IJiLg-UrE9DxJgdzGTi7onFmFcFsU",
    message: "admin created / login successful",
  }),

  // ForgotPassword: {
  //   email: "vivi@gmail.com"
  // },
  InvalidEmail: responseSchema({
    message: "invalid email",
    status: 400,
  }),
  // ResetPasswordSent: responseSchema({
  //   message: "Password reset link has been sent successfully",
  //   status: 200
  // }),
  InvalidEmailOrPassword: responseSchema({
    message: "invalid email or password",
    status: 400,
  }),
  InvalidPassword: responseSchema({
    message: "invalid password",
    status: 401,
  }),
  EmailDoesNotExists: responseSchema({
    message: "user with email does not exist",
    status: 404,
  }),
  UserEmailExists: responseSchema({
    message: "user with email already exists",
    status: 409,
  }),

  User,
  UserRequired: ValueRequired(User),
  UserCreated: ModelCreated("user", User_d),
  UserUpdated: ModelUpdated("user", User_d),
  UsersFetched: ModelsFetched("users", User_d),
  UserFetched: ModelFetched("user", User_d),
  UserDeleted: ModelDeleted("user"),
  UserNotFound: ModelNotFound("user"),
  InvalidUserId: InvalidId("user"),

  Course,
  CourseRequired: ValueRequired(Course),
  CourseCreated: ModelCreated("course", Course_d),
  CourseUpdated: ModelUpdated("course", Course_d),
  CoursesFetched: ModelsFetched("courses", Course_d),
  CourseFetched: ModelFetched("course", Course_d),
  CourseDeleted: ModelDeleted("course"),
  CourseNotFound: ModelNotFound("course"),
  InvalidCourseId: InvalidId("course"),
};

module.exports = schemas;
