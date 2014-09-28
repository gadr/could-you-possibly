GruntVTEX = require 'grunt-vtex'

module.exports = (grunt) ->
  pkg = grunt.file.readJSON 'package.json'

  lang = grunt.option('lang') or 'en-US'

  config = GruntVTEX.generateConfig grunt, pkg

  config.clean.main.push 'dist/'
  config.clean.deploy = ["dist/#{pkg.version}/{i18n/,templates/,script/main.js,index.*,style/includes/}"]

  config.browserify =
    main:
      src: ['build/<%= relativePath %>/script/main.js']
      dest: "build/<%= relativePath %>/script/#{pkg.name}.js"
      options:
        transform: ['brfs']

  config.less =
    main:
      files: [
        src: ['src/style/style.less']
        dest: "build/<%= relativePath %>/style/#{pkg.name}.css"
      ]

  config['compile-handlebars'] =
    index:
      template: 'src/index.hbs'
      templateData: {pkg: pkg}
      output: 'build/<%= relativePath %>/index.html'
    main:
      template: 'src/templates/main.hbs'
      templateData: "src/i18n/#{lang}.json"
      output: 'build/<%= relativePath %>/templates/main.html'

  config.watch.main.files.push 'src/**/*.hbs'
  config.watch.main.tasks.push 'compile-handlebars', 'browserify'

  tasks =
    # Building block tasks
    build: ['clean:main', 'copy:main', 'compile-handlebars', 'coffee', 'browserify', 'less']
    min: ['useminPrepare', 'uglify', 'usemin'] # minifies files
    # Deploy tasks
    dist: ['build', 'min', 'copy:deploy', 'clean:deploy'] # Dist - minifies files
    # Development tasks
    default: ['build', 'connect', 'watch']
    devmin: ['build', 'min', 'connect:http:keepalive'] # Minifies files and serve

  # Project configuration.
  grunt.initConfig config
  grunt.loadNpmTasks name for name of pkg.devDependencies when name[0..5] is 'grunt-' and name isnt 'grunt-vtex'
  grunt.registerTask taskName, taskArray for taskName, taskArray of tasks
