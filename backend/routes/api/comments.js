const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Comment, Image } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


///Validator

const validateComment = [
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a comment'),
  handleValidationErrors
];


//get comments for image




// Upload

router.post(
    '/',
    validateComment,
    asyncHandler(async (req, res) => {
      const { userId, imageId, body } = req.body;
      const newComment = await Comment.create({ userId, imageId, body });

      res.json(newComment)
    }),
  );

router.put(
    '/:commentId',
    requireAuth,
    asyncHandler(async (req, res) => {
      const { body  } = req.body;
      const {commentId} = req.params
      const comment = await Comment.findByPk(+commentId)

      const updated = await  comment.update({ body });

        res.json(updated)
    }),
  );

  //Delete
router.delete(
    '/:commentId',
    asyncHandler(async (req, res) => {
      const {commentId} = req.params



      await Comment.destroy({where:{
        id:commentId
      }});
      res.json("Success")
    }),
  );
module.exports = router;