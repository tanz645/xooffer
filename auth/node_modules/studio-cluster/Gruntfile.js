var grunt = require("grunt");
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-release');
grunt.loadNpmTasks('grunt-mocha-test');
grunt.loadNpmTasks('grunt-istanbul');

grunt.initConfig({
	watch: {
		scripts: {
			files: ['src/**/*.js', '*.js', 'tests/*.js'
			],
			tasks: ['all'],
			options: {
				spawn: false
			}
		}
	},
	instrument: {
		files: ['src/**/*.js','tests/**/*.js'],
		options: {
			lazy: false,
			basePath: '.coverage'
		}
	},
	jshint: {
		all: ['src/**/*.js', '*.js', 'tests/**/*.js'],
		options:{
			esnext:true
		}
	},
	mochaTest: {
		test: {
			options: {
				reporter: 'spec',
				clearRequireCache:true
			},
			src: ['tests/basic_test.js']
		},
		testCancel: {
			options: {
				reporter: 'spec',
				clearRequireCache:true
			},
			src: ['tests/cancel_test.js']
		},
		testRedis: {
			options: {
				reporter: 'spec',
				clearRequireCache:true
			},
			src: ['tests/basic_redis_test.js']
		},
		testAll: {
			options: {
				reporter: 'spec',
				clearRequireCache:true
			},
			src: ['tests/**/*_test.js','!tests/cancel_test.js','!tests/basic_test.js', '!tests/basic_redis_test.js']
		},
		cov: {
			options: {
				reporter: 'spec',
				clearRequireCache:true
			},
			src: ['.coverage/tests/basic_test.js']
		},
		covCancel: {
			options: {
				reporter: 'spec',
				clearRequireCache:true
			},
			src: ['.coverage/tests/cancel_test.js']
		},
		covRedis: {
			options: {
				reporter: 'spec',
				clearRequireCache:true
			},
			src: ['.coverage/tests/basic_redis_test.js']
		},
		covAll: {
			options: {
				reporter: 'spec',
				clearRequireCache:true
			},
			src: ['.coverage/tests/**/*_test.js','!.coverage/tests/cancel_test.js','!.coverage/tests/basic_test.js','!.coverage/tests/basic_redis_test.js']
		}
	},
	storeCoverage: {
		options: {
			dir: '.coverage/reports'
		}
	},
	makeReport: {
		src: '.coverage/reports/**/*.json',
		options: {
			type: 'html',
			dir: '.coverage/reports',
			print: 'both'
		}
	},
	release: {
		options: {
			bump: true,
			npm: true,
			npmTag: "<%= version %>"
		}
	}

});
grunt.registerTask("cov-test", [ "instrument","mochaTest:cov","mochaTest:covCancel","mochaTest:covAll", "mochaTest:covRedis",'storeCoverage',
	'makeReport']);
grunt.registerTask("test", ["mochaTest:test","mochaTest:testCancel","mochaTest:testAll","mochaTest:testRedis"]);
grunt.registerTask("coverage", ["jshint","cov-test"]);
grunt.registerTask("all", ["jshint", "test"]);
grunt.registerTask("default", ["all", "watch"]);
grunt.registerTask("prod", ["all", "release"]);

