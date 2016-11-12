'use strict';

const root      = require('app-root-path');
const path      = require('path');
const fs        = require('fs');
const bootstrap = require('../index').bootstrap;

const CZ_CONFIG_NAME = '.cz-config.js';

fs.access(path.join(root.path, CZ_CONFIG_NAME), fs.R_OK, (err) => {
    const adapter = !err ? 'cz-customizable' : 'cz-conventional-changelog';

    bootstrap({
        cliPath: path.join(__dirname, '../node_modules/commitizen'),
        config : {
            'path': adapter
        }
    });
});
