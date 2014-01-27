---
layout: default
username: BeDifferential
repo: meteor-comments
version: 0.0.9
desc: A meteorite package for commenting.

---
# meteor-comments

A meteorite package to add a commenting section to collections on at the document level.


This package currently requires you to use coffeescript and minimongoid.  The first step is to create a collection that extends the `Commentable` minimongoid class and optionally provide a `before_comment` hook to modify the comment document.  You can add additional users to notify and add tags to help organize notifications in your app (see below, for rest of the story).

```
class @Response extends Commentable
  @_collection = new Meteor.Collection 'responses'
  
  before_comment: (comment) ->
    # Tag the comment with this userid for whatever reason
    if something.userId is Meteor.userId()
      comment.notify.push Meteor.userId()

    comment
```

Render the comments template, passing it the context of your `Commentable`.

{% assign comments = '{{ comments response }}' %}
`{{ comments }}`


The system can automatically help alert users who have already commented if a new comment is added.  You can use the built-in template for this.  You can optionally provide an array of tags that can help organize how notifications are displayed/filtered.

{% assign unread = '{{ unreadWidget opts }}' %}
`{{ unread }}`

```
opts: ->
  tags: []
  align: 'right'
```
