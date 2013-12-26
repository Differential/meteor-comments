---
layout: default
username: BeDifferential
repo: meteor-comments
version: 0.0.9
desc: A meteorite package for commenting.

---
# meteor-comments

A meteorite package to add a commenting section to collections on at the document level.


This package currently requires you to use coffeescript and minimongoid.  The first step is to create a collection and extend the `Commentable` minimongoid class:

```
class @Response extends Commentable
  @_collection = new Meteor.Collection 'responses'
```


Render the comments template, passing it the context of your `Commentable`.

<code>{{ > _comments response }}</code>

The system can automatically help alert users who have already commented if a new comment is added.  You can use the built-in template for this.

<code>{{ > _unreadWidget opts }}</code>

```
opts: ->
  tags: []
  align: 'right'
```
