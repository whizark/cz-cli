'use strict';

// The `cz-customizable` adapter for `commitizen` to support deprecated `.cz-config.js`.
//
// This code is based on:
// cz-customizable/index.js at v4.0.0 · leonardoanalista/cz-customizable
// https://github.com/leonardoanalista/cz-customizable/blob/v4.0.0/index.js

// Inspired by: https://github.com/commitizen/cz-conventional-changelog and https://github.com/commitizen/cz-cli

const CZ_CONFIG_NAME = '.cz-config.js';
const findConfig     = require('find-config');
const log            = require('winston');
const editor         = require('editor');
const temp           = require('temp').track();
const fs             = require('fs');
const path           = require('path');
const buildCommit    = require('cz-customizable/buildCommit');

function readConfigFile() {
    const pkg = findConfig.require('package.json', {home: false});

    if (pkg &&
        pkg.config && pkg.config['cz-customizable'] && pkg.config['cz-customizable'].config
    ) {
        const pkgPath = path.resolve(pkg.config['cz-customizable'].config);

        console.info('>>> Using cz-customizable config specified in your package.json: ', pkgPath);

        return require(pkgPath);
    }

    const config = findConfig.require(CZ_CONFIG_NAME, {home: false});

    if (config) {
        console.info('>>> cz-customizable config file has been found.');

        return config;
    }

    log.warn(
        'Unable to find a configuration file. ' +
        'Please refer to documentation to learn how to ser up: ' +
        'https://github.com/leonardoanalista/cz-customizable#steps "'
    );
}

module.exports = {
    prompter(cz, commit) {
        const config = readConfigFile();

        log.info(
            '\n\n' +
            'Line 1 will be cropped at 100 characters. All other lines will be wrapped after 100 characters.' +
            '\n'
        );

        const questions = require('cz-customizable/questions').getQuestions(config, cz);

        cz.prompt(questions).then((answers) => {
            if (answers.confirmCommit === 'edit') {
                temp.open(null, (err, info) => {
                    if (!err) {
                        fs.write(info.fd, buildCommit(answers));

                        fs.close(info.fd, (err) => {
                            editor(info.path, (code, sig) => {
                                if (code === 0) {
                                    const commitStr = fs.readFileSync(info.path, {encoding: 'utf8'});

                                    commit(commitStr);
                                } else {
                                    log.info(
                                        `Editor returned non zero value. Commit message was:\n${buildCommit(answers)}`
                                    );
                                }
                            });
                        });
                    }
                });
            } else if (answers.confirmCommit === 'yes') {
                commit(buildCommit(answers));
            } else {
                log.info('Commit has been canceled.');
            }
        });
    },
};
