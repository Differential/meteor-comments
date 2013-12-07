Package.describe({
  summary: "Comments"
});

Package.on_use(function (api, where) {

  api.use([
    'templating',
    'handlebars',
    'less'
  ], 'client');

  api.use([
    'coffeescript',
    'minimongoid',
    'moment',
    'underscore'
  ], ['client', 'server']);


  
  api.add_files([
    'client/views/comments/_comments.html',
    'client/views/comments/_comments.coffee',
    'client/views/comments/_comments.less'
  ], 'client');

  api.add_files([
    'server/publications.coffee'
  ], 'server');

  api.add_files([
    'collections/comments.coffee'
  ], ['client', 'server']);

  

  api.export('Commentable', ['client', 'server'])
  api.export('Comment', ['client', 'server'])
  
});