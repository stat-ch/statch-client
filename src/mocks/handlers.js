// src/mocks/handlers.js
import { graphql } from "msw";

export const handlers = [
  // 아이디 중복 체크 ("newId" 입력 시 허용, 아니면 중복되어있다고 판단)
  graphql.query("EmailConfirm", (req, res, ctx) => {
    return res(
      ctx.JSON({
        result: "already exist",
        error: false,
      })
    );
  }),
  graphql.query("CheckUserId", (req, res, ctx) => {
    const { userId } = req.variables;
    if (userId === "newId") {
      return res(
        ctx.JSON({
          result: "ok",
          error: false,
        })
      );
    } else {
      return res(
        ctx.JSON({
          result: "already exist",
          error: false,
        })
      );
    }
  }),
  graphql.mutation("Register", (req, res, ctx) => {
    return res(
      ctx.JSON({
        result: "ok",
        error: false,
      })
    );
  }),
  graphql.query("Login", (req, res, ctx) => {
    const { userId } = req.variables;
    if (userId === "invalidId") {
      return res(
        ctx.JSON({
          result: "invalid userId",
          error: false,
        })
      );
    }
  }),
];

// export const handlers = [
//   // Handles a "Login" mutation
//   graphql.mutation('Login', (req, res, ctx) => {
//     const { username } = req.variables
//     sessionStorage.setItem('is-authenticated', username)
//     return res(
//       ctx.data({
//         login: {
//           username,
//         },
//       }),
//     )
//   }),
//   // Handles a "GetUserInfo" query
//   graphql.query('GetUserInfo', (req, res, ctx) => {
//     const authenticatedUser = sessionStorage.getItem('is-authenticated')
//     if (!authenticatedUser) {
//       // When not authenticated, respond with an error
//       return res(
//         ctx.errors([
//           {
//             message: 'Not authenticated',
//             errorType: 'AuthenticationError',
//           },
//         ]),
//       )
//     }
//     // When authenticated, respond with a query payload
//     return res(
//       ctx.data({
//         user: {
//           username: authenticatedUser,
//           firstName: 'John',
//         },
//       }),
//     )
//   }),
// ]
