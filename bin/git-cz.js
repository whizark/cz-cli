'use strict';

const root       = require('app-root-path');
const path       = require('path');
const fs         = require('fs');
const findConfig = require('find-config');
const bootstrap  = require('../index').bootstrap;

const pkg            = findConfig.require('package.json', {home: false});
const CZ_CONFIG_NAME = '.cz-config.js';

if (pkg && pkg.config) {
    const cliPath = path.dirname(path.dirname(require.resolve('commitizen')));

    if (pkg.config.commitizen && pkg.config.commitizen.path) {
        bootstrap({
            cliPath,
            config: {
                path: pkg.config.commitizen.path
            }
        });

        return;
    }

    if (pkg.config['cz-customizable'] && pkg.config['cz-customizable'].config) {
        const czCustomizable = require.resolve('../adapter/cz-customizable');

        bootstrap({
            cliPath,
            config: {
                path: czCustomizable
            }
        });

        return;
    }
}

fs.access(path.join(root.path, CZ_CONFIG_NAME), fs.R_OK, (err) => {
    const cliPath                 = path.dirname(path.dirname(require.resolve('commitizen')));
    const czCustomizable          = require.resolve('../adapter/cz-customizable');
    const czConventionalChangelog = require.resolve('cz-conventional-changelog');

    bootstrap({
        cliPath,
        config: {
            path: !err ? czCustomizable : czConventionalChangelog
        }
    });
});
