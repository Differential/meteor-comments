Meteor.publish 'comments', (associationId) ->
  Comment.find
    associationId: associationId
  , sort:
      createdAt: 1

Meteor.publish 'unreadComments', ->
  Comment.find({'notify': { $in: [@userId]}})