/**
 * @api {get} /api/users/info get my info
 * @apiVersion 0.0.1
 * @apiName getMyInfo
 * @apiGroup Users
 *
 * @apiDescription get my info. For token validation only.
 *
 * @apiPermission authenticated
 * @apiUse AuthorizationHeader
 * @apiUse AuthorizationError
 *
 * @apiErrorExample {json} Error-Response1:
 *     HTTP/1.1 401 Unauthorized
 *
 * @apiSuccessExample {json} Success-Response1:
 *     HTTP/1.1 200 OK
 *  {
 *    "_id": "57e25eca994b7d6f514a5494",
 *    "username": "koa2"
 *  }
 *
 * @apiSampleRequest /api/users/info
 *
 */
