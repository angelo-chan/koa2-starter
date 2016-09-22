/**
 * @api {post} /api/auth/ authenticate
 * @apiVersion 0.0.1
 * @apiName authenticate
 * @apiGroup Auth
 *
 * @apiParam {String{2..15}} username username
 * @apiParam {String{2..15}} password password
 *
 * @apiUse AuthorizationError
 *
 * @apiExample Example usage:
 *  {
 *    "phone": "koa2",
 *    "password": "koa2"
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1N2UxZTYzZWViZmM2MjEyZDQxYjY4YmUiLCJ0eXBlIjoiU1lTVEVNIiwiaWF0IjoxNDc0NDUwNjM0LCJleHAiOjE0NzQ0ODY2MzR9.1KdJ5s-WlFAc56ApxSaP3qd3tVZtMzEVe7_wzHYcU6U",
 *     "token_type": "Bearer",
 *     "expires_in": 36000
 *  }
 *
 * @apiErrorExample {json} Error-Response1:
 *  HTTP/1.1 401 Unauthorized
 *  {
 *     "message": "Missing credentials"
 *  }
 *
 * @apiErrorExample {json} Error-Response2:
 *  HTTP/1.1 401 Unauthorized
 *  {
 *    "message": "user_not_exist"
 *  }
 *
 * @apiErrorExample {json} Error-Response3:
 *  HTTP/1.1 401 Unauthorized
 *  {
 *    "message": "incorrect_password"
 *  }
 *
 * @apiSampleRequest /api/auth
 *
 */


