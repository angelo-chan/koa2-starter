/**
 * @api {get} /api/health health check
 * @apiVersion 0.0.1
 * @apiName healthCheck
 * @apiGroup Health
 *
 * @apiSampleRequest /api/health
 *
 *
 * @apiSuccess {String} status Server status.
 * @apiSuccess {String} msg Server information message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "OK",
 *       "msg": "I'm alive!"
 *     }
 */

/**
 * @api {get} /api/health/status health status
 * @apiVersion 0.0.1
 * @apiName healthStatus
 * @apiGroup Health
 *
 * @apiSampleRequest /api/health/status
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 *    {
 *      "status":"UP",
 *      "mongo": {"status":"UP"},
 *      "redis":{"status":"UP"}
 *    }
 *
 * @apiErrorExample Success-Response:
 *     HTTP/1.1 503 Service Unavailable
 *
 *    {
 *      "status":"DOWN",
 *      "mongo": {"status":"DOWN"},
 *      "redis":{"status":"UP"}
 *    }
 */

