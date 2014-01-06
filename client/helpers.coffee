Handlebars.registerHelper 'unreadWidget', (opts) ->
  new Handlebars.SafeString(Template['_unreadWidget'](opts))

Handlebars.registerHelper 'unreadWidgetTrigger', (opts) ->
  opts = _.extend Comments.settings.unreadWidget, opts
  template = opts.template
  new Handlebars.SafeString(Template[template](opts))  

Handlebars.registerHelper 'unreadWidgetDropdown', (opts) ->
  opts = _.extend Comments.settings.unreadWidget, opts
  template = opts.dropdownTemplate
  new Handlebars.SafeString(Template[template](opts))

Handlebars.registerHelper 'count', (opts) ->
  opts = _.extend Comments.settings.unreadWidget, opts
  tags = opts.tags
  Comment.unread(tags).length

Handlebars.registerHelper 'countLabelClass', (opts) ->
  opts = _.extend Comments.settings.unreadWidget, opts
  tags = opts.tags
  if Comment.unread(tags).length > 0 then 'label-danger' else 'label-default'

Handlebars.registerHelper 'unreadComments', (opts) ->
  opts = _.extend Comments.settings.unreadWidget, opts
  tags = opts.tags
  Comment.unread(tags)

Handlebars.registerHelper 'align', (opts) ->
  opts = _.extend Comments.settings.unreadWidget, opts
  opts.align