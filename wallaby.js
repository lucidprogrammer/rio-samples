module.exports = function (wallaby) {
    return {
      files: [
        
        'src/**/*.js',
        '!src/**/test/*.spec.js',
        { pattern: 'node_modules/**', instrument: false },
        

      ],
  
      tests: [
        'src/**/test/*.spec.js'
      ],
      env: {
        type: 'node'
      }
    
      // for node.js tests you need to set env property as well
      // https://wallabyjs.com/docs/integration/node.html
    };
  };