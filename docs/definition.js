/**
 * @apiDefine AuthorizationHeader
 * @apiHeader {String} Authorization The access token of bear type
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NmVmNmNhYmU1ODY5MTgyMmMzN2Q1YWYiLCJhY2NvdW50X3R5cGUiOiJzeXN0ZW0iLCJpYXQiOjE0NTg1NTMzMzEsImV4cCI6MTQ1ODU4OTMzMX0.4G35Q9FETHW3WZGkkb6bYWLzT9o5cTse5-MMd4hLjKN"
 * }
 */

/**
 * @apiDefine AuthorizationBasicHeader
 * @apiHeader {String} Authorization the base64 encode clientId and clientSecret, base64(clientId:clientSecret)
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Authorization": "Basic eHg6eHg="
 * }
 */

/**
 * @apiDefine AuthorizationError
 * @apiError (Error 401) Unauthorized no authorization token was found or invalid signature
 */

/**
 * @apiDefine BadRequestError
 * @apiError (Error 400) BadRequest bad request
 */

/**
 * @apiDefine ForbiddenError
 * @apiError (Error 403) Forbidden forbidden
 */

/**
 * @apiDefine NotFoundError
 * @apiError (Error 404) NotFound not found
 */

/**
 * @apiDefine ConflictError
 * @apiError (Error 409) Conflict conflict
 */

/**
 * @apiDefine  ValidationError
 * @apiError (Error 422) Unprocessable  validation error
 */

/**
 * @apiDefine authenticated authenticated user only
 */
