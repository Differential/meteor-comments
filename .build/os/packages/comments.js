(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/comments/server/publications.coffee.js                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('comments', function(associationId) {
  return Comment.find({
    associationId: associationId
  }, {
    sort: {
      createdAt: 1
    }
  });
});

Meteor.publish('unreadComments', function() {
  return Comment.find({
    'notify': {
      $in: [this.userId]
    }
  });
});
///////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/comments/collections/comments.coffee.js                  //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var _ref,                      
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Commentable = (function(_super) {
  __extends(Commentable, _super);

  function Commentable(attr, parent) {
    if (attr == null) {
      attr = {};
    }
    if (parent == null) {
      parent = null;
    }
    Commentable.__super__.constructor.call(this, attr, parent);
    if (Meteor.subscribe) {
      Meteor.subscribe('comments', this.id);
    }
  }

  Commentable.has_many = [
    {
      name: 'comments',
      foreign_key: 'associationId'
    }
  ];

  Commentable.prototype.before_comment = function(comment) {
    return comment;
  };

  return Commentable;

})(Minimongoid);

Comment = (function(_super) {
  __extends(Comment, _super);

  function Comment() {
    _ref = Comment.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Comment._collection = new Meteor.Collection('comments');

  Comment.unread = function(tags) {
    var selection;
    selection = {
      notify: {
        $in: [Meteor.userId()]
      }
    };
    if (tags && _.isArray(tags) && tags.length > 0) {
      selection.tags = {
        $in: tags
      };
    }
    return this.where(selection);
  };

  Comment.prototype.clearNotification = function() {
    return this.pull({
      notify: Meteor.userId()
    });
  };

  Comment.prototype.commentPreview = function() {
    return this.comment.substring(0, 20) + '...';
  };

  return Comment;

})(Minimongoid);
///////////////////////////////////////////////////////////////////////

}).call(this);
