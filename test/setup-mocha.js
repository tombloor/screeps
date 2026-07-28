//inject mocha globally to allow custom interface refer without direct import - bypass bundle issue
global._ = require('lodash');
global.mocha = require('mocha');
global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));

// Screeps game constants
global.OK = 0;
global.ERR_NOT_IN_RANGE = -9;
global.FIND_SOURCES = 105;
global.FIND_MY_SPAWNS = 112;
global.RESOURCE_ENERGY = "energy";
global.WORK = "work";
global.CARRY = "carry";
global.MOVE = "move";

// Override ts-node compiler options
process.env.TS_NODE_PROJECT = 'tsconfig.test.json'
