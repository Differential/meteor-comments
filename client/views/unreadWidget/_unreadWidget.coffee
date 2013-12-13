#
#  Unread Widget
#
getOpts = ->
  defaults =
    tags: []
    align: 'left'
  opts = Session.get 'comments.unread.options'
  _.extend defaults, opts

Template._unreadWidget.rendered = ->
  # Set options hash
  Session.set 'comments.unread.options', @data

  # Set the width of the dropdown to the computed value so the slide works correctly
  $('.unread-widget').on 'shown.bs.dropdown', (e) ->
    $('.comments-dropdown').css 'width', $('.comments-dropdown').width()

Template._unreadWidget.helpers
  count: ->
    Comment.unread(getOpts().tags).length

  countLabelClass: ->
    if Comment.unread(getOpts().tags).length > 0 then 'label-danger' else 'label-default'

  unreadComments: ->
    Comment.unread(getOpts().tags)

  align: ->
    getOpts().align

Template._unreadWidget.events  
  'click .clear-comments': (e) ->
    e.preventDefault()
    e.stopPropagation()
    
    count = Comment.unread(getOpts().tags).length

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
            _.each Comment.unread(getOpts().tags), (comment) ->
              comment.clearNotification()