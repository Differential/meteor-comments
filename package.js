Package.describe({
  summary: "Comments"
});

Package.on_use(function (api, where) {

  api.use([
    'templating',
    'ui',
    'less',
    'timeago',
    'ace-embed',
    'marked'
  ], 'client');

  api.use([
    'coffeescript',
    'minimongoid',
    'underscore'
  ], ['client', 'server']);


  
  api.add_files([
    'client/views/comments/_comments.html',
    'client/views/comments/_comments.coffee',
    'client/views/comments/_comments.less',
    'client/views/unreadWidget/_unreadWidget.html',
    'client/views/unreadWidget/_unreadWidget.coffee',
    'client/views/unreadWidget/_unreadWidget.less',
    'client/subscriptions.coffee',
    'client/helpers.coffee',
    'client/config.coffee'
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
