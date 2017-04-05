'use strict';

const root      = require('app-root-path');
const path      = require('path');
const fs        = require('fs');
const bootstrap = require('../index').bootstrap;

const CZ_CONFIG_NAME = '.cz-config.js';

fs.access(path.join(root.path, CZ_CONFIG_NAME), fs.R_OK, (err) => {
    const cliPath                 = path.dirname(path.dirname(require.resolve('commitizen')));
    const czCustomizable          = require.resolve('../adapter/cz-customizable');
    const czConventionalChangelog = require.resolve('cz-conventional-changelog');
    const adapter                 = !err ? czCustomizable : czConventionalChangelog;

    bootstrap({
        cliPath: cliPath,
        config : {
            'path': adapter
        }
    });
});
