// Entry express server file for messenger-AI


// ====== IMPORTS ======

// System
const path = require('path');
const fs = require('fs');

// Express
const express = require('express');

// Dotenv
require('dotenv').config({
    path: path.join(__dirname, '../config/.env')
});

// Mongoose
const mongoose = require('mongoose');

// App
const app = require('./app.js');

// Functions
const appListenerCb = require('./functions/appListenerCb.js');


// ====== GLOBAL VARS ======

const PORT = 5555;

// ====== MAIN ======

const server = app.listen(PORT, (err) => {
    appListenerCb(err, server.address().port);
});
