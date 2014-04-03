UI.registerHelper 'count', (opts) ->
  opts = _.extend Comments.settings.unreadWidget, opts
  tags = opts.tags
  Comment.unread(tags).length

UI.registerHelper 'countLabelClass', (opts) ->
  opts = _.extend Comments.settings.unreadWidget, opts
  tags = opts.tags
  if Comment.unread(tags).length > 0 then 'label-danger' else 'label-default'

UI.registerHelper 'unreadComments', (opts) ->
  opts = _.extend Comments.settings.unreadWidget, opts
  tags = opts.tags
  Comment.unread(tags)