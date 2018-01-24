module.exports = function(grunt){

	var globalConfig = {
		dev: '../dist',
		dist: '../dist'
	};

	require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

	grunt.initConfig({

		globalConfig: globalConfig,

		// Task usada para monitorar mudanças nos arquivos e executar sua respectiva task.
		watch: {
			
			// Espera por mudanças nos arquivos .less do projeto e automaticamente gera o css.
			less: {
				files: ['app/styles/**/*.less'],
				tasks: ['less:dev','copy:styles', 'cssmin', 'postcss','clean:helpers'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			// Espera por mudanças nos arquivos .js e realiza as verificações e otimizações de javascript.
			js: {
				files: ['app/scripts/**/*.js'],
				tasks: ['jshint:all', 'ngAnnotate:dev', 'uglify:dev', 'includeSource:dev'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			// Espera por mudanças nos arquivos .pug (antigo jade) e gera o html.
			pug: {
				files: ['app/layouts/**/*.pug'],
				tasks: ['pug:dev', 'includeSource:dev'],
				options: {
					spawn: false,
					livereload: true
				}
			}
		},

		// Configuração da task para gerar o css a partir dos .less.
		less: {
			dev: {
				files: [{
					cwd: 'app/styles',
					src: '**/*.less',
					dest: '<%= globalConfig.dev %>/css',
					expand: true,
					ext: '.css'
				}]
			}
		},

		// Configuração da task para compilar o .pug e gerar o html.
		pug: {
			dev: {
				options: {
					pretty : true
				},
				files: [
					{
						cwd: 'app/layouts',
						src: ['**/*.pug', '!includes/**/*.pug'],
						dest: '<%= globalConfig.dev %>',
						expand: true,
						ext: '.html'
					}
				]
			},
			// Configuração para produção, onde é gerado um html minificado.
			prod : {
				options: {
					pretty : false
				},
				files: [
					{
						cwd: 'app/layouts',
						src: ['**/*.pug', '!includes/**/*.pug'],
						dest: '<%= globalConfig.dist %>',
						expand: true,
						ext: '.html'
					}
				]
			}
		},

		includeSource: {
			dev: {
				options: {
					basePath: '<%= globalConfig.dev %>',
					baseUrl: '.'
				},
				files: {
					'<%= globalConfig.dev  %>/index.html': '<%= globalConfig.dev  %>/index.html'
				}
			},
			prod: {
				options: {
					basePath: '<%= globalConfig.dist %>',
					baseUrl: '.'
				},
				files: {
					'<%= globalConfig.dist  %>/index.html': '<%= globalConfig.dist  %>/index.html'
				}
			}
		},

		copy: {
			dev: {
				expand: true,
				src: ['app/images/**', 'app/fonts/**', 'app/styles/libs/**'],
				dest: '<%= globalConfig.dev  %>'
			},
			styles: {
				expand: true,
				src: ['app/styles/libs/**'],
				dest: '<%= globalConfig.dev  %>'
			},
			deploy: {
				expand:true,
				src: ['../wedeploy.json'],
				dest: '<%= globalConfig.dist  %>/wedeploy.json'
			},
			prod: {
				expand: true,
				files : [
					{
						expand: true,
						src: ['app/images/**', 'app/fonts/**', 'app/styles/libs/**'],
						dest: '<%= globalConfig.dist  %>'
					}
				]
			}
		},

		ngAnnotate: {
			options: {
				singleQuotes: true
			},
			dev: {
				files: [
					{
						cwd: '<%= globalConfig.dev %>/js',
						src: ['**/*.js'],
						dest: '<%= globalConfig.dev %>/js',
						expand: true,
						ext: '.js'
					}
				]

			}
		},

		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'<%= globalConfig.dist %>/css/main.min.css': [
						'<%= globalConfig.dist %>/app/styles/libs/**/*.css',
						'<%= globalConfig.dist %>/css/**/*.css',
						'!<%= globalConfig.dist %>/css/main.min.css'

					]
				}
			}
		},

		postcss: {
			options: {

				processors: [
					require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
				]
			},
			dist: {
				src: '<%= globalConfig.dist %>/css/main.min.css'
			}
		},

		notify: {
			dev: {
				options: {
					title: 'Grunt Dev',
					message: 'Grunt dev iniciado!'
				}
			},
			prod: {
				options: {
					title: 'Versão para implantação',
					message: 'Versão foi gerada com sucesso!'
				}
			}
		},

		useminPrepare: {
			html: '<%= globalConfig.dist  %>/index.html',
			options: {
				dest: '<%= globalConfig.dist  %>',
				root: '<%= globalConfig.dist  %>/..'
			}
		},

		usemin: {
			html: '<%= globalConfig.dist  %>/index.html',
			options: {
				blockReplacements: {
					css: function (block) {
						return '<link rel="stylesheet" href="' + block.dest + '">';
					},
					js: function (block) {
						return '<script src="' + block.dest + '"></script>';
					}
				}
			}
		},

		clean: {
			options : {
				force : true
			},
			build: ['<%= globalConfig.dist  %>'],
			helpers:{
				files: {
					src: [
						'<%= globalConfig.dist  %>/css/**/*',
						'<%= globalConfig.dist  %>/app/styles',
						'!<%= globalConfig.dist  %>/css/main.min.css'
					]
				}
			}
		},

		shell: {
			options: {
				stderr: true
			},
			deploy: {
				command: [
					'echo "--- Realizando deploy da aplicação no wedeploy.io"',
					'grunt prod',
					'cd ../dist',
					'we deploy --project minutrade --service desafio'
				].join('&&')
			}
		},

		// Configuração para fazer validação em todo o JS
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish'),
				ignores: [
					'app/scripts/libs/**/*.js'
				]
			},
			all: {
				src: [
					'Gruntfile.js',
					'app/scripts/**/*.js'
				]
			}
		},

		uglify:{
			dev: {
				options: {
					banner: '!function(exports) {\n/* @ngInject */\n',
					footer: '\n}(function() { this.app = this.app || {controllers:{}, directives:{}, services:{}, utils:{}}; return this.app;}());',
					mangle: false,
					beautify: true,
					compress: false
				},
				files: [
					{
						cwd: 'app/scripts',
						src: ['**/*.js'],
						dest: '<%= globalConfig.dev %>/js',
						expand: true,
						ext: '.js'
					}
				]

			},
			test: {
				options: {
					banner: '!function(exports) {\n/* @ngInject */\n',
					footer: '\n}(function() { this.app = this.app || {controllers:{}, directives:{}, services:{}, utils:{}}; return this.app;}());',
					mangle: false,
					beautify: true,
					exportAll: true
				},
				files : [
					{
						cwd: 'app/scripts',
						src: ['**/*.js'],
						dest: '<%= globalConfig.dist %>/js',
						expand: true,
						ext: '.js'
					}
				]
			}

		}
	});

	grunt.registerTask('default', ['jshint:all', 'clean:build', 'copy:dev' ,'pug:dev', 'uglify:dev', 'ngAnnotate:dev', 'less:dev', 'cssmin' ,'includeSource:dev',
		'notify:dev', 'postcss', 'clean:helpers', 'watch']);


	// Minifica JS, CSS, HTML, e sem watch
	grunt.registerTask('prod', ['jshint:all', 'clean:build', 'copy:prod' ,'pug:prod', 'uglify:prod', 'ngAnnotate:dev', 'less:dev', 'cssmin' ,'includeSource:prod',
		'notify:prod', 'postcss', 'clean:helpers']);

	// Gera a release com tudo minificado e implanta no serviço wedeploy.io (somente aos usuários que tenham o acesso liberado no serviço).
	grunt.registerTask('deploy', ['jshint:all', 'clean:build', 'copy:prod' ,'pug:prod', 'uglify:prod', 'ngAnnotate:dev', 'less:dev', 'cssmin' ,'includeSource:prod',
		'notify:prod', 'postcss', 'clean:helpers', 'copy:deploy', 'shell:deploy']);

};