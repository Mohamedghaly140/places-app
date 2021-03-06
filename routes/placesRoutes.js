const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

// import controllers
const {
	getPlaces,
	getPlaceById,
	getPlacesByUserId,
	updatePlaceById,
	deletePlaceById,
	createPlace,
} = require('../controllers/placesController'); // Places Controllers
const fileUpload = require('../middleware/file-upload');
const auth = require('../middleware/auth');

router.get('/', getPlaces);

router.get('/:pid', getPlaceById);

router.get('/user/:uid', getPlacesByUserId);

router.post(
	'/',
	auth,
	fileUpload.single('image'),
	[
		body('title', 'Title is required').not().isEmpty(),
		body('description', 'Please enter description min length is 5').isLength({
			min: 5,
		}),
		body('address', 'Address is required').not().isEmpty(),
	],
	createPlace
);

router.put(
	'/:pid',
	auth,
	[
		body('title', 'Title is required').not().isEmpty(),
		body('description', 'Please enter description min length is 5').isLength({
			min: 5,
		}),
	],
	updatePlaceById
);

router.delete('/:pid', auth, deletePlaceById);

module.exports = router;
