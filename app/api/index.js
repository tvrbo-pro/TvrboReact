// API ROUTINES
import config from '../config/server';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// ROUTER AND ROUTES
var router = express.Router();

router.use('/api', bodyParser.json({limit: '10mb'}));
router.use('/api', cookieParser());

// HANDLERS
import userApiRoutes from './user';
import eventApiRoutes from './event';

router.use('/api', userApiRoutes);
router.use('/api', eventApiRoutes);


// Error handling
router.use(function(err, req, res, next){
	if(!err) return res.send('');
	res.status(500).send({error: err.message || err});

	if(config.DEBUG) console.log(err);
});

// EXPORT
export default router;
