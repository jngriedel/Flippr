const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const imagesRouter = require('./images.js')
const cameraRollRouter = require('./cameraroll.js')
const commentsRouter = require('./comments.js')
const favoritesRouter = require('./favorites.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/images', imagesRouter)

router.use('/cameraroll', cameraRollRouter)

router.use('/comments', commentsRouter)

router.use('/favorites', favoritesRouter)

module.exports = router;
