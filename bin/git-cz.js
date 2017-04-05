'use strict';

const root       = require('app-root-path');
const path       = require('path');
const fs         = require('fs');
const findConfig = require('find-config');
const bootstrap  = require('../index').bootstrap;

const CZ_CONFIG_NAME = '.cz-config.js';

fs.access(path.join(root.path, CZ_CONFIG_NAME), fs.R_OK, (err) => {
    const cliPath                 = path.dirname(path.dirname(require.resolve('commitizen')));
    const czCustomizable          = require.resolve('../adapter/cz-customizable');
    const czConventionalChangelog = require.resolve('cz-conventional-changelog');

    let adapter = czConventionalChangelog;

    if (!err) {
        adapter = czCustomizable;
    } else {
        const pkg = findConfig.require('package.json', {home: false});

        if (pkg &&
            pkg.config && pkg.config['cz-customizable'] && pkg.config['cz-customizable'].config
        ) {
            adapter = czCustomizable;
        }
    }

    bootstrap({
        cliPath: cliPath,
        config : {
            path: adapter
        }
    });
});
