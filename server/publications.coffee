Meteor.publish 'comments', (associationId) ->
  Comment.find
    associationId: associationId
  , sort:
      createdAt: 1

Meteor.publish 'unreadComments', ->
  Comment.find({'notify': { $in: [@userId]}})

Meteor.publish 'commentsUser', ->
  Meteor.users.find _id: @userId,
    fields: profile: 1