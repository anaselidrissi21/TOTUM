const express = require('express');

const router = express.Router();
const commentController = require('../../controllers/api/commentController');

const apiErrorController = require('../../controllers/api/error');
const validator = require('../../validation/validator');

const commentGetSchema = require('../../validation/schemas/comment/commentGet.schema');
const commentPostSchema = require('../../validation/schemas/comment/commentPost.schema');
const commentManageSchema = require('../../validation/schemas/comment/commentManage.schema');

const controllerHandler = require('../../helpers/controllerHandler');
const errorHandler = require('../../helpers/errorHandler');
const jwt = require('../../services/token');

router.route('/:id/user')
    .get(
        validator('query', commentGetSchema),
        controllerHandler(commentController.getByUser)
    );

router.route('/:id/activity')
    .get(
        validator('query', commentGetSchema),
        controllerHandler(commentController.getByActivity),

    )

router.route('/createNew')
    .post(
        validator('query', categoryPostSchema),
        controllerHandler(commentController.createComment),

    )


router.route('/:id/manage')
    .get(
        validator('body', commentGetSchema),
        controllerHandler(commentController.getOneComment),

    )

    .patch(
        validator('body', commentManageSchema),
        controllerHandler(commentController.updateComment),
    )

    .delete(
        validator('query', commentManageSchema),
        controllerHandler(commentController.removeComment)
    )



router.use(apiErrorController.error404);
router.use(errorHandler);



module.exports = router;

// /**
//      * GET /api/cadex
//      * @summary To get a random cadex and personalize it
//      * @param {string} noun.query - cadex personalized noun
//      * @param {string} adjective.query - cadex personalized adjective
//      * @param {string} verb.query - cadex personalized verb
//      * @param {string} complement.query - cadex personalized complement
//      * @return {cadex} 200 - success response
//      * @return {error} 400 - input data invalid
//      */
