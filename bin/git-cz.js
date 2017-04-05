'use strict';

const path       = require('path');
const findConfig = require('find-config');
const bootstrap  = require('../index').bootstrap;

const pkg            = findConfig.require('package.json', {home: false});
const cliPath        = path.resolve(require.resolve('commitizen'), '../../');
const CZ_CONFIG_NAME = '.cz-config.js';

if (pkg && pkg.config) {
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

const config = findConfig.obj(CZ_CONFIG_NAME, {home: false});

if (config !== null) {
    const czCustomizable = require.resolve('../adapter/cz-customizable');

    bootstrap({
        cliPath,
        config: {
            path: czCustomizable
        }
    });

    return;
}

const czConventionalChangelog = require.resolve('cz-conventional-changelog');

bootstrap({
    cliPath,
    config: {
        path: czConventionalChangelog
    }
});
