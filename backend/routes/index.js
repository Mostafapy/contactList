const authRouter = require('./auth.route');

const router = require('express').Router();
const apiRouters = require('express').Router();

// Routes
router.use('/api/v1', apiRouters);
apiRouters.use('/auth', authRouter);

module.exports = router;
