'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mocha = require('mocha');

var _mocha2 = _interopRequireDefault(_mocha);

var _wdioSync = require('wdio-sync');

var __$Getters__ = [];
var __$Setters__ = [];
var __$Resetters__ = [];

function __GetDependency__(name) {
    return __$Getters__[name]();
}

function __Rewire__(name, value) {
    __$Setters__[name](value);
}

function __ResetDependency__(name) {
    __$Resetters__[name]();
}

var __RewireAPI__ = {
    '__GetDependency__': __GetDependency__,
    '__get__': __GetDependency__,
    '__Rewire__': __Rewire__,
    '__set__': __Rewire__,
    '__ResetDependency__': __ResetDependency__
};
var path = _path2['default'];

__$Getters__['path'] = function () {
    return path;
};

__$Setters__['path'] = function (value) {
    path = value;
};

__$Resetters__['path'] = function () {
    path = _path2['default'];
};

var Mocha = _mocha2['default'];

__$Getters__['Mocha'] = function () {
    return Mocha;
};

__$Setters__['Mocha'] = function (value) {
    Mocha = value;
};

__$Resetters__['Mocha'] = function () {
    Mocha = _mocha2['default'];
};

var runInFiberContext = _wdioSync.runInFiberContext;
var wrapCommands = _wdioSync.wrapCommands;
var executeHooksWithArgs = _wdioSync.executeHooksWithArgs;

__$Getters__['runInFiberContext'] = function () {
    return runInFiberContext;
};

__$Setters__['runInFiberContext'] = function (value) {
    runInFiberContext = value;
};

__$Resetters__['runInFiberContext'] = function () {
    runInFiberContext = _wdioSync.runInFiberContext;
};

__$Getters__['wrapCommands'] = function () {
    return wrapCommands;
};

__$Setters__['wrapCommands'] = function (value) {
    wrapCommands = value;
};

__$Resetters__['wrapCommands'] = function () {
    wrapCommands = _wdioSync.wrapCommands;
};

__$Getters__['executeHooksWithArgs'] = function () {
    return executeHooksWithArgs;
};

__$Setters__['executeHooksWithArgs'] = function (value) {
    executeHooksWithArgs = value;
};

__$Resetters__['executeHooksWithArgs'] = function () {
    executeHooksWithArgs = _wdioSync.executeHooksWithArgs;
};

var INTERFACES = {
    bdd: ['before', 'beforeEach', 'it', 'after', 'afterEach'],
    tdd: ['suiteSetup', 'setup', 'test', 'suiteTeardown', 'teardown'],
    qunit: ['before', 'beforeEach', 'test', 'after', 'afterEach']
};

var _INTERFACES = INTERFACES;

__$Getters__['INTERFACES'] = function () {
    return INTERFACES;
};

__$Setters__['INTERFACES'] = function (value) {
    INTERFACES = value;
};

__$Resetters__['INTERFACES'] = function () {
    INTERFACES = _INTERFACES;
};

var EVENTS = {
    'suite': 'suite:start',
    'suite end': 'suite:end',
    'test': 'test:start',
    'test end': 'test:end',
    'hook': 'hook:start',
    'hook end': 'hook:end',
    'pass': 'test:pass',
    'fail': 'test:fail',
    'pending': 'test:pending'
};

var _EVENTS = EVENTS;

__$Getters__['EVENTS'] = function () {
    return EVENTS;
};

__$Setters__['EVENTS'] = function (value) {
    EVENTS = value;
};

__$Resetters__['EVENTS'] = function () {
    EVENTS = _EVENTS;
};

var NOOP = function NOOP() {};

/**
 * Mocha runner
 */
var _NOOP = NOOP;

__$Getters__['NOOP'] = function () {
    return NOOP;
};

__$Setters__['NOOP'] = function (value) {
    NOOP = value;
};

__$Resetters__['NOOP'] = function () {
    NOOP = _NOOP;
};

var MochaAdapter = (function () {
    function MochaAdapter(cid, config, specs, capabilities) {
        _classCallCheck(this, MochaAdapter);

        /**
         * rename requires option to stay backwards compatible
         * ToDo remove with next major release
         */
        if (config.mochaOpts && config.mochaOpts.requires) {
            if (Array.isArray(config.mochaOpts.require)) {
                config.mochaOpts.require.push(config.mochaOpts.requires);
            } else {
                config.mochaOpts.require = config.mochaOpts.requires;
            }
        }

        this.cid = cid;
        this.capabilities = capabilities;
        this.specs = specs;
        this.config = _Object$assign({
            mochaOpts: {}
        }, config);
        this.runner = {};
    }

    _createClass(MochaAdapter, [{
        key: 'options',
        value: function options(_options, context) {
            var _options$require = _options.require;

            var require = _options$require === undefined ? [] : _options$require;

            var _options$compilers = _options.compilers;
            var compilers = _options$compilers === undefined ? [] : _options$compilers;

            if (typeof require === 'string') {
                require = [require];
            }

            this.requireExternalModules([].concat(_toConsumableArray(require), _toConsumableArray(compilers)), context);
        }
    }, {
        key: 'run',
        value: function run() {
            var mochaOpts, mocha, result;
            return _regeneratorRuntime.async(function run$(context$2$0) {
                var _this = this;

                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        mochaOpts = this.config.mochaOpts;

                        if (typeof mochaOpts.ui !== 'string' || !INTERFACES[mochaOpts.ui]) {
                            mochaOpts.ui = 'bdd';
                        }

                        mocha = new Mocha(mochaOpts);

                        mocha.loadFiles();
                        mocha.reporter(NOOP);
                        mocha.fullTrace();
                        this.specs.forEach(function (spec) {
                            return mocha.addFile(spec);
                        });

                        wrapCommands(global.browser, this.config.beforeCommand, this.config.afterCommand);

                        mocha.suite.on('pre-require', function (context, file, mocha) {
                            _this.options(mochaOpts, {
                                context: context, file: file, mocha: mocha, options: mochaOpts
                            });

                            INTERFACES[mochaOpts.ui].forEach(function (fnName) {
                                var testCommand = INTERFACES[mochaOpts.ui][2];

                                runInFiberContext([testCommand, testCommand + '.only'], _this.config.beforeHook, _this.config.afterHook, fnName);
                            });
                        });

                        context$2$0.next = 11;
                        return _regeneratorRuntime.awrap(executeHooksWithArgs(this.config.before, [this.capabilities, this.specs]));

                    case 11:
                        context$2$0.next = 13;
                        return _regeneratorRuntime.awrap(new _Promise(function (resolve, reject) {
                            _this.runner = mocha.run(resolve);

                            _Object$keys(EVENTS).forEach(function (e) {
                                return _this.runner.on(e, _this.emit.bind(_this, EVENTS[e]));
                            });

                            _this.runner.suite.beforeAll(_this.wrapHook('beforeSuite'));
                            _this.runner.suite.beforeEach(_this.wrapHook('beforeTest'));
                            _this.runner.suite.afterEach(_this.wrapHook('afterTest'));
                            _this.runner.suite.afterAll(_this.wrapHook('afterSuite'));
                        }));

                    case 13:
                        result = context$2$0.sent;
                        context$2$0.next = 16;
                        return _regeneratorRuntime.awrap(executeHooksWithArgs(this.config.after, [result, this.capabilities, this.specs]));

                    case 16:
                        return context$2$0.abrupt('return', result);

                    case 17:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this);
        }

        /**
         * Hooks which are added as true Mocha hooks need to call done() to notify async
         */
    }, {
        key: 'wrapHook',
        value: function wrapHook(hookName) {
            var _this2 = this;

            return function (done) {
                return executeHooksWithArgs(_this2.config[hookName], _this2.prepareMessage(hookName)).then(function () {
                    return done();
                }, function (e) {
                    console.log('Error in ' + hookName + ' hook', e.stack);
                    done();
                });
            };
        }
    }, {
        key: 'prepareMessage',
        value: function prepareMessage(hookName) {
            var params = { type: hookName };

            switch (hookName) {
                case 'beforeSuite':
                case 'afterSuite':
                    params.payload = this.runner.suite.suites[0];
                    break;
                case 'beforeTest':
                case 'afterTest':
                    params.payload = this.runner.test;
                    break;
            }

            params.err = this.runner.lastError;
            delete this.runner.lastError;
            return this.formatMessage(params);
        }
    }, {
        key: 'formatMessage',
        value: function formatMessage(params) {
            var message = {
                type: params.type
            };

            if (params.err) {
                message.err = {
                    message: params.err.message,
                    stack: params.err.stack,
                    type: params.err.type || params.err.name,
                    expected: params.err.expected,
                    actual: params.err.actual
                };
            }

            if (params.payload) {
                message.title = params.payload.title;
                message.parent = params.payload.parent ? params.payload.parent.title : null;

                /**
                 * get title for hooks in root suite
                 */
                if (message.parent === '' && params.payload.parent && params.payload.parent.suites) {
                    message.parent = params.payload.parent.suites[0].title;
                }

                message.pending = params.payload.pending || false;
                message.file = params.payload.file;

                // Add the current test title to the payload for cases where it helps to
                // identify the test, e.g. when running inside a beforeEach hook
                if (params.payload.ctx && params.payload.ctx.currentTest) {
                    message.currentTest = params.payload.ctx.currentTest.title;
                }

                if (params.type.match(/Test/)) {
                    message.passed = params.payload.state === 'passed';
                    message.duration = params.payload.duration;
                }
            }

            return message;
        }
    }, {
        key: 'requireExternalModules',
        value: function requireExternalModules(modules, context) {
            var _this3 = this;

            modules.forEach(function (module) {
                if (module) {
                    module = module.replace(/.*:/, '');

                    if (module.substr(0, 1) === '.') {
                        module = path.join(process.cwd(), module);
                    }

                    _this3.load(module, context);
                }
            });
        }
    }, {
        key: 'emit',
        value: function emit(event, payload, err) {
            // For some reason, Mocha fires a second 'suite:end' event for the root suite,
            // with no matching 'suite:start', so this can be ignored.
            if (payload.root) return;

            var message = this.formatMessage({ type: event, payload: payload, err: err });

            message.cid = this.cid;
            message.specs = this.specs;
            message.event = event;
            message.runner = {};
            message.runner[this.cid] = this.capabilities;

            if (err) {
                this.runner.lastError = err;
            }

            // When starting a new test, propagate the details to the test runner so that
            // commands, results, screenshots and hooks can be associated with this test
            if (event === 'test:start') {
                this.sendInternal(event, message);
            }

            this.send(message);
        }
    }, {
        key: 'sendInternal',
        value: function sendInternal(event, message) {
            process.emit(event, message);
        }

        /**
         * reset globals to rewire it out in tests
         */
    }, {
        key: 'send',
        value: function send() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return process.send.apply(process, args);
        }
    }, {
        key: 'load',
        value: function load(name, context) {
            try {
                module.context = context;

                require(name);
            } catch (e) {
                throw new Error('Module ' + name + ' can\'t get loaded. Are you sure you have installed it?\n' + 'Note: if you\'ve installed WebdriverIO globally you need to install ' + 'these external modules globally too!');
            }
        }
    }]);

    return MochaAdapter;
})();

var _MochaAdapter = MochaAdapter;
var _MochaAdapter2 = _MochaAdapter;

__$Getters__['_MochaAdapter'] = function () {
    return _MochaAdapter;
};

__$Setters__['_MochaAdapter'] = function (value) {
    _MochaAdapter = value;
};

__$Resetters__['_MochaAdapter'] = function () {
    _MochaAdapter = _MochaAdapter2;
};

var adapterFactory = {};

var _adapterFactory = adapterFactory;

__$Getters__['adapterFactory'] = function () {
    return adapterFactory;
};

__$Setters__['adapterFactory'] = function (value) {
    exports.adapterFactory = adapterFactory = value;
};

__$Resetters__['adapterFactory'] = function () {
    exports.adapterFactory = adapterFactory = _adapterFactory;
};

adapterFactory.run = function callee$0$0(cid, config, specs, capabilities) {
    var adapter;
    return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                adapter = new _MochaAdapter(cid, config, specs, capabilities);
                context$1$0.next = 3;
                return _regeneratorRuntime.awrap(adapter.run());

            case 3:
                return context$1$0.abrupt('return', context$1$0.sent);

            case 4:
            case 'end':
                return context$1$0.stop();
        }
    }, null, this);
};

var _defaultExport = adapterFactory;

if (typeof _defaultExport === 'object' || typeof _defaultExport === 'function') {
    Object.defineProperty(_defaultExport, '__Rewire__', {
        'value': __Rewire__,
        'enumberable': false
    });
    Object.defineProperty(_defaultExport, '__set__', {
        'value': __Rewire__,
        'enumberable': false
    });
    Object.defineProperty(_defaultExport, '__ResetDependency__', {
        'value': __ResetDependency__,
        'enumberable': false
    });
    Object.defineProperty(_defaultExport, '__GetDependency__', {
        'value': __GetDependency__,
        'enumberable': false
    });
    Object.defineProperty(_defaultExport, '__get__', {
        'value': __GetDependency__,
        'enumberable': false
    });
    Object.defineProperty(_defaultExport, '__RewireAPI__', {
        'value': __RewireAPI__,
        'enumberable': false
    });
}

exports['default'] = _defaultExport;
exports.MochaAdapter = MochaAdapter;
exports.adapterFactory = adapterFactory;
exports.__GetDependency__ = __GetDependency__;
exports.__get__ = __GetDependency__;
exports.__Rewire__ = __Rewire__;
exports.__set__ = __Rewire__;
exports.__ResetDependency__ = __ResetDependency__;
exports.__RewireAPI__ = __RewireAPI__;
