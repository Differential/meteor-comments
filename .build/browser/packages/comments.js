(function () {

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/comments/client/views/comments/template._comments.js                     //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
Template.__define__("_comments",Package.handlebars.Handlebars.json_ast_to_func(["<div class=\"comments\">\n    <h3>Comments</h3>\n    <ul class=\"list-group\">\n      ",["#",[[0,"each"],[0,"comments"]],["\n        <li class=\"list-group-item\">\n          <p>\n            ",["#",[[0,"markdown"]],[["{",[[0,"comment"]]]]],"\n          </p>\n          <p class=\"text-muted\">\n            - ",["{",[[0,"username"]]]," (",["{",[[0,"commentDate"],[0,"createdAt"]]],")\n          </p>\n        </li>\n      "],["\n        <li class=\"list-group-item\">No comments... yet</li>\n      "]],"\n    </ul>\n    ",["#",[[0,"if"],[0,"currentUser"]],["\n      <div class=\"form-group editor-group\">\n        \n        <div id=\"preview\" class=\"",["#",[[0,"unless"],[0,"previewing"]],["hide"]],"\">\n          ",["#",[[0,"markdown"]],[["{",[[0,"newComment"]]]]],"\n        </div>\n\n        <div id=\"editor-wrapper\" class=\"",["#",[[0,"if"],[0,"previewing"]],["hide"]],"\">\n        ",["#",[[0,"constant"]],["\n          <div id=\"editor\"></div>\n        "]],"\n        </div>\n\n        <button class=\"toggle-preview\">\n          ",["#",[[0,"if"],[0,"previewing"]],["\n            <i class=\"fa fa-eye-slash icon-eye-close\"></i>\n          "],["\n            <i class=\"fa fa-eye icon-eye-open\"></i>\n          "]],"\n        </button>\n\n        <span class=\"text-muted pull-right hint\">\n          <strong>Hint:</strong> you can use \n          <a target=\"_blank\" href=\"http://daringfireball.net/projects/markdown/syntax\">markdown</a> to enhance your comments!\n        </span>\n\n        <button class=\"btn btn-primary add-comment\">\n          <i class=\"fa fa-comment icon-comment\"></i> Comment\n        </button>\n      \n      </div>\n    "],["\n      <div class=\"alert alert-warning\">\n        You must be logged in to comment!\n      </div>\n    "]],"\n  </div>"]));
                                                                                     // 2
///////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/comments/client/views/comments/_comments.coffee.js                       //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Editor;

Handlebars.registerHelper("commentDate", function(date) {
  var dateObj;
  if (date) {
    dateObj = new Date(date);
    return $.timeago(dateObj);
  }
  return "some time ago";
});

Editor = {};

Template._comments.created = function() {
  Session.set('comments.new.value', '');
  return Session.set('comments.new.previewing', false);
};

Template._comments.rendered = function() {
  var commentable;
  commentable = this.data;
  _.each(commentable.comments(), function(comment) {
    comment.clearNotification();
    Editor = ace.edit('editor');
    Editor.setTheme('ace/theme/chrome');
    Editor.getSession().setMode('ace/mode/markdown');
    Editor.setFontSize(16);
    Editor.renderer.setShowPrintMargin(false);
    Editor.renderer.setShowGutter(false);
    Editor.setHighlightActiveLine(true);
    return Editor.on('change', function(e) {
      return Session.set('comments.new.value', Editor.getValue());
    });
  });
  return $('.toggle-preview').tooltip({
    title: 'Click to toggle markdown preview mode.'
  });
};

Template._comments.helpers({
  comments: function() {
    return this.comments();
  },
  newComment: function() {
    return Session.get('comments.new.value');
  },
  previewing: function() {
    return Session.get('comments.new.previewing');
  }
});

Template._comments.events({
  'click .toggle-preview': function(e) {
    var preview;
    preview = Session.get('comments.new.previewing');
    preview = !preview;
    return Session.set('comments.new.previewing', preview);
  },
  'click .add-comment': function(e) {
    var comment;
    comment = {
      associationId: this.id,
      userId: Meteor.userId(),
      username: Meteor.user().username || Meteor.user().emails[0].address,
      comment: Session.get('comments.new.value'),
      path: Router.current().path,
      notify: [],
      tags: []
    };
    comment = this.before_comment(comment);
    _.each(this.comments(), function(e) {
      return comment.notify.push(e.userId);
    });
    comment.notify = _.uniq(comment.notify);
    comment.notify = _.reject(comment.notify, function(e) {
      return e === Meteor.userId();
    });
    Comment.create(comment);
    Session.set('comments.new.value', '');
    return Editor.setValue('');
  }
});
///////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/comments/client/views/unreadWidget/template._unreadWidget.js             //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
Template.__define__("_unreadWidget",Package.handlebars.Handlebars.json_ast_to_func(["<div class=\"btn-group unread-widget\">\n    <button type=\"button\" \n            class=\"btn btn-default dropdown-toggle comments-btn\"\n            ",["#",[[0,"unless"],[0,"count"]],[" disabled "]]," \n            data-toggle=\"dropdown\">\n      <i class=\"fa fa-comment icon-comment\"></i>\n      <span class=\"label ",["{",[[0,"countLabelClass"]]]," unread-count\">",["{",[[0,"count"]]],"</span>\n      <i class=\"fa fa-caret-down icon-caret-down\"></i>\n    </button>\n    <ul class=\"dropdown-menu comments-dropdown pull-",["{",[[0,"align"]]],"\" role=\"menu\">\n      <li>\n        <a href=\"#\" class=\"clear-comments\">\n          Clear All <i class=\"fa fa-times icon-remove pull-right\"></i>\n        </a>\n      </li>\n      ",["#",[[0,"each"],[0,"unreadComments"]],["\n        <li id=\"",["{",[[0,"id"]]],"\" class=\"comment\">\n          <a href=\"",["{",[[0,"path"]]],"\">\n            ",["{",[[0,"commentPreview"]]],"\n            <br>\n            - ",["{",[[0,"username"]]]," (",["{",[[0,"commentDate"],[0,"createdAt"]]],")\n          </a>\n        </li>\n      "]],"\n    </ul>\n  </div>"]));
                                                                                     // 2
///////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/comments/client/views/unreadWidget/_unreadWidget.coffee.js               //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var getOpts;

getOpts = function() {
  var defaults, opts;
  defaults = {
    tags: [],
    align: 'left'
  };
  opts = Session.get('comments.unread.options');
  return _.extend(defaults, opts);
};

Template._unreadWidget.rendered = function() {
  Session.set('comments.unread.options', this.data);
  return $('.unread-widget').on('shown.bs.dropdown', function(e) {
    return $('.comments-dropdown').css('width', $('.comments-dropdown').width());
  });
};

Template._unreadWidget.helpers({
  count: function() {
    return Comment.unread(getOpts().tags).length;
  },
  countLabelClass: function() {
    if (Comment.unread(getOpts().tags).length > 0) {
      return 'label-danger';
    } else {
      return 'label-default';
    }
  },
  unreadComments: function() {
    return Comment.unread(getOpts().tags);
  },
  align: function() {
    return getOpts().align;
  }
});

Template._unreadWidget.events({
  'click .clear-comments': function(e) {
    var count;
    e.preventDefault();
    e.stopPropagation();
    count = Comment.unread(getOpts().tags).length;
    return $('.comments-dropdown li.comment').each(function(i, e) {
      var $e;
      $e = $(e);
      return $e.delay(i * 80).animate({
        marginLeft: (parseInt($e.css("marginLeft"), 10) === 0 ? $e.outerWidth() : 0)
      }, function() {
        if (i + 1 === count) {
          return $('.comments-dropdown').slideUp(300, function() {
            return _.each(Comment.unread(getOpts().tags), function(comment) {
              return comment.clearNotification();
            });
          });
        }
      });
    });
  }
});
///////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/comments/collections/comments.coffee.js                                  //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////

}).call(this);
