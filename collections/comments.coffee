class Commentable extends Minimongoid
  
  # Go ahead and autosubscribe to the associated comments
  constructor: (attr = {}, parent = null) ->
    super(attr, parent)
    if Meteor.subscribe then Meteor.subscribe 'comments', @id

  @has_many: [
    {name: 'comments', foreign_key: 'associationId'}
  ]

  commentCount: ->
    if @comments then @comments().length

  before_comment: (comment) ->
    comment
    
class Comment extends Minimongoid
  @_collection = new Meteor.Collection 'comments'

  @unread: (tags = {}) ->
    # Grab all for current user
    selection = 
      notify:
        $in: [Meteor.userId()]
    
    # Filter down using tags
    if tags && _.isObject(tags) && _.keys(tags).length > 0
      selection.tags = tags

    @where selection

  clearNotification: ->
    @pull notify: Meteor.userId()

  commentPreview: ->
    @comment.substring(0, 20) + '...'