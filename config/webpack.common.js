// Webpack configurations common to development and production

// ====== IMPORTS ======

// System
const path = require('path');

// Plugins 
const FileManagerPlugin = require('filemanager-webpack-plugin');

// Functions
const getDirs = require('./functions/getDirectories/getDirectories.js');
const buildEntriesObj = require('./functions/buildEntriesObj/buildEntriesObj.js');

// ====== GLOBAL VARS ======

const entryFolders = getDirs(path.join(__dirname, '../src'));
const entryObj = buildEntriesObj(entryFolders);


// ====== CONFIGURATION ======

module.exports = {
    entry: entryObj,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        assetModuleFilename: (pathData) => {
            const issuer = pathData.module.resourceResolveData.context.issuer;
            let issuerPath;
            if (issuer.includes('/')) {
                issuerPath = issuer.split('/').slice(-2, -1)[0];
            } else {
                issuerPath = issuer.split('\\').slice(-2, -1)[0];
            }
            return issuerPath + '/assets/[hash][ext]';
        },
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            }            
        ]
    },
    plugins: [
        new FileManagerPlugin({
            events: {
              onStart: { 
                 delete: [
                  {
                    source: path.join(__dirname,'../dist/').replaceAll('\\','/'), 
                     options:{
                       force: true,
                       recursive : true,
                       },
                   },
                 ],
               },
            },
         })
    ]
}
