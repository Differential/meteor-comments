Handlebars.registerHelper "commentDate", (date) ->
  if date
    dateObj = new Date(date)
    return $.timeago(dateObj)
  "some time ago"


Template._comments.rendered = ->
  commentable = @data
  _.each commentable.comments(), (comment) ->
    comment.clearNotification()

Template._comments.helpers
  comments: ->
    @comments()

Template._comments.events
  'click .add-comment': (e) ->
    comment = 
      associationId: @id
      userId: Meteor.userId()
      username: Meteor.user().username
      comment: $('.comment').val()
      path: Router.current().path
      notify: []
      tags: []

    # Allow custom modification
    comment = @before_comment comment

    # Add every other commentor above to notify list
    _.each @comments(), (e) ->
      comment.notify.push e.userId

    # Remove duplicates
    comment.notify = _.uniq comment.notify

    # Remove this user
    comment.notify = _.reject comment.notify, (e) ->
      e is Meteor.userId()

    # Add the comment
    Comment.create comment


Template._unreadWidget.rendered = ->
  # Set the width of the dropdown to the computed value so the slide works correctly
  $('.unread-widget').on 'shown.bs.dropdown', (e) ->
    $('.comments-dropdown').css 'width', $('.comments-dropdown').width()

Template._unreadWidget.helpers
  count: ->
    Comment.unread(@id).length

  countLabelClass: ->
    if Comment.unread(@id).length > 0 then 'label-danger' else 'label-default'

  unreadComments: ->
    Comment.unread(@id)

Template._unreadWidget.events  
  'click .clear-comments': (e) ->
    e.preventDefault()
    e.stopPropagation()
    
    count = Comment.unread(@id).length
    datasetId = @id

    $('.comments-dropdown li.comment').each (i, e) ->
      # Slide each item out to right
      $e = $(e)
      $e.delay(i*80).animate
        marginLeft: (if parseInt($e.css("marginLeft"), 10) is 0 then $e.outerWidth() else 0)
      , ->
        # After the last one slides out, slide the menu up to close
        if i+1 is count
          $('.comments-dropdown').slideUp 300, ->
            # Finally, actually clear the notification in the database
            _.each Comment.unread(datasetId), (comment) ->
              comment.clearNotification()