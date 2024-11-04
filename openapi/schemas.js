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

const Auth = {
  ...Login,
  firstName: "John",
  lastName: "Stone",
  idNumber: "2018/251501",
  isStudent: true,
};

const Auth_d = makeDB({
  ...Auth,
});

const Course = {
  class: "100L",
  code: "Engr 101",
  status: "normal",
};

const Course_d = makeDB({
  ...Course,
});

const User = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@gmail.com",
  password: "Password123",
  role: "admin",
};

const Position = {
  role: "Head Teacher",
  class: "HDT",
  course: "Engr 101",
};

const Position_d = makeDB({
  ...Position,
  user: Auth_d.id,
});

const Event = {
  title: "Project Presentation",
  course: "PRO 101",
  date: new Date(),
  class: "Room 101",
  startTime: 1000,
  endTime: 1200,
  status: "normal",
};

const Event_d = makeDB({
  ...Event,
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

  Auth,
  UserRequired: ValueRequired(Auth),
  UserCreated: ModelCreated("user", Auth_d),
  UserUpdated: ModelUpdated("user", Auth_d),
  UsersFetched: ModelsFetched("users", Auth_d),
  UserFetched: ModelFetched("user", Auth_d),
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

  Position,
  PositionRequired: ValueRequired(Position),
  PositionCreated: ModelCreated("position", Position_d),
  PositionDeleted: ModelDeleted("position"),
  PositionNotFound: ModelNotFound("position"),
  InvalidPositionId: InvalidId("position"),

  Event,
  EventRequired: ValueRequired(Event),
  EventCreated: ModelCreated("event", Event_d),
  EventUpdated: ModelUpdated("event", Event_d),
  EventsFetched: ModelsFetched("events", Event_d),
  EventFetched: ModelFetched("event", Event_d),
  EventDeleted: ModelDeleted("event"),
  EventNotFound: ModelNotFound("event"),
  InvalidEventId: InvalidId("event"),
};

module.exports = schemas;
