const express = require('express');
const passport = require('passport');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: OAuth Authentication Routes
 */


/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Authenticate using Google
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects to the home page after successful authentication
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */


/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     summary: Authenticate using GitHub
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects to the home page after successful authentication
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout the current user
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects to the home page after logout
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /auth/login:
 *   get:
 *     summary: Inform user to authenticate
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Message prompting user to authenticate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
    });

router.get('/github',
    passport.authenticate('github', { scope: ['read:user'] }));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
    });

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.redirect('/');
    });
});

router.get('/login', (req, res) => {
    res.status(200).json({ message: 'Please authenticate using /auth/google/callback or /auth/github/callback' });
});

module.exports = router;
