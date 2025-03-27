const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');

module.exports = {
    
    plugins: [
        new MomentLocalesPlugin({
            localesToKeep: ['fr'], 
        }),
        new MomentTimezoneDataPlugin({
            matchZones: /^Morocco\/Rabat$/, // Include only the 'Morocco/Rabat' timezone
        })
    ]
};
