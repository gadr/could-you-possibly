i18n = require '../i18n/en-US.json'
fs = require 'fs'
template = fs.readFileSync(__dirname +  '/../templates/main.html', 'utf8')

states =
  greeting:
    active: true
  yes:
    active: false
  no:
    active: false
  thankShare:
    active: false
  thankComment:
    active: false

# handler -> next -> render
class CouldYouPossibly
  constructor: (options = {}) ->
    @data = {
      i18n: i18n
      states: states
      url: options.url ? window.location.host
      title: options.title ? ''
      author: options.author ? ''
    }
    @shareSelector = options.selector ? 'section.share'
    @$node = $(@shareSelector)
    template = template
      .replace(/\{url\}/g, @data.url)
      .replace(/\{title\}/g, @data.title)
      .replace(/\{author\}/g, @data.author)
    @$node.html(template)
    @$node.on('click', @clickHandler)
    $(window).on('new-comment', @commentHandler)

    @updateView()

  clickHandler: (e) =>
    $target = $(e.target)
    next = $target.data('next')
    if next
      @next(next)
      @updateView()

  commentHandler: (e) =>
    if @data.states.no.active
      @next('thankComment')
      @updateView()

  next: (next) =>
    for name, state of @data.states
      if name is next
        state.active = true
      else
        state.active = false

  updateView: =>
    activeStateName = null
    _.each @data.states, (v, k) -> activeStateName = k if v.active
    @$node.find('.state').each ->
      $el = $(this)
      if $el.hasClass(activeStateName)
        $el.addClass 'active'
      else
        $el.removeClass 'active'

window.CouldYouPossibly = CouldYouPossibly