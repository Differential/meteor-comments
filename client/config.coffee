@Comments = 
  settings:
    unreadWidget:
      tags: []
      align: 'right'
      template: '_unreadWidgetTrigger'
      dropdownTemplate: '_unreadWidgetDropdown'
  config: (opts) ->
    @settings = _.extend @settings, opts