(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
    "thanksreading": "Thanks for reading!",
    "didYouEnjoy": "Did you enjoy the article?",
    "yes": "Yes",
    "no": "No",
    "great": "Great!" ,
    "couldshare": "Could you possibly share it with a friend?",
    "bummer": "Bummer.",
    "couldcomment": "Could you possibly comment on how I could make it better?",
    "thankShare": "Thanks for sharing!",
    "thankComment": "Thanks for commenting!"
}

},{}],2:[function(require,module,exports){
(function() {
  var CouldYouPossibly, fs, i18n, states, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  i18n = require('../i18n/en-US.json');

  

  template = "<div class=\"could-you-possibly\">\n    <div class=\"state greeting\">\n        <div class=\"pull-right share-buttons\">\n            <a class=\"icon-twitter\" data-next=\"thankShare\" href=\"http://twitter.com/share?text={title}&amp;url={url}&amp;via={author}&amp;related={author}\" onclick=\"window.open(this.href, 'twitter-share', 'width=550,height=235');return false;\">\n                <span class=\"hidden\">Twitter</span>\n            </a>\n            <a class=\"icon-facebook\" data-next=\"thankShare\" href=\"https://www.facebook.com/sharer/sharer.php?u={url}\" onclick=\"window.open(this.href, 'facebook-share','width=580,height=296');return false;\">\n                <span class=\"hidden\">Facebook</span>\n            </a>\n            <a class=\"icon-google-plus\" data-next=\"thankShare\" href=\"https://plus.google.com/share?url={url}\" onclick=\"window.open(this.href, 'google-plus-share', 'width=490,height=530');return false;\">\n                <span class=\"hidden\">Google+</span>\n            </a>\n        </div>\n        <h3>Thanks for reading!</h3>\n        <p>Did you enjoy the article?</p>\n        <div class=\"button-group\">\n            <button class=\"yes btn\" data-next=\"yes\">Yes</button>\n            <button class=\"no btn\" data-next=\"no\">No</button>\n        </div>\n    </div>\n    <div class=\"state yes\">\n        <button class=\"btn btn-link pull-right\" data-next=\"greeting\">Back</button>\n        <h3>Great!</h3>\n        <p>Could you possibly share it with a friend?</p>\n        <div class=\"share-buttons\">\n            <a class=\"icon-twitter\" data-next=\"thankShare\" href=\"http://twitter.com/share?text={title}&amp;url={url}&amp;via={author}&amp;related={author}\" onclick=\"window.open(this.href, 'twitter-share', 'width=550,height=235');return false;\">\n                <span class=\"hidden\">Twitter</span>\n            </a>\n            <a class=\"icon-facebook\" data-next=\"thankShare\" href=\"https://www.facebook.com/sharer/sharer.php?u={url}\" onclick=\"window.open(this.href, 'facebook-share','width=580,height=296');return false;\">\n                <span class=\"hidden\">Facebook</span>\n            </a>\n            <a class=\"icon-google-plus\" data-next=\"thankShare\" href=\"https://plus.google.com/share?url={url}\" onclick=\"window.open(this.href, 'google-plus-share', 'width=490,height=530');return false;\">\n                <span class=\"hidden\">Google+</span>\n            </a>\n        </div>\n    </div>\n    <div class=\"state no\">\n        <button class=\"btn btn-link pull-right\" data-next=\"greeting\">Back</button>\n        <h3>Bummer.</h3>\n        <p>Could you possibly comment on how I could make it better?</p>\n    </div>\n    <div class=\"state thankShare\">\n        <button class=\"btn btn-link pull-right\" data-next=\"yes\">Back</button>\n        <h2>Thanks for sharing!</h2>\n    </div>\n    <div class=\"state thankComment\">\n        <button class=\"btn btn-link pull-right\" data-next=\"greeting\">Back</button>\n        <h2>Thanks for commenting!</h2>\n    </div>\n</div>";

  states = {
    greeting: {
      active: true
    },
    yes: {
      active: false
    },
    no: {
      active: false
    },
    thankShare: {
      active: false
    },
    thankComment: {
      active: false
    }
  };

  CouldYouPossibly = (function() {
    function CouldYouPossibly(options) {
      var _ref, _ref1, _ref2, _ref3;
      if (options == null) {
        options = {};
      }
      this.updateView = __bind(this.updateView, this);
      this.next = __bind(this.next, this);
      this.commentHandler = __bind(this.commentHandler, this);
      this.clickHandler = __bind(this.clickHandler, this);
      this.data = {
        i18n: i18n,
        states: states,
        url: (_ref = options.url) != null ? _ref : window.location.host,
        title: (_ref1 = options.title) != null ? _ref1 : '',
        author: (_ref2 = options.author) != null ? _ref2 : ''
      };
      this.shareSelector = (_ref3 = options.selector) != null ? _ref3 : 'section.share';
      this.$node = $(this.shareSelector);
      template = template.replace(/\{url\}/g, this.data.url).replace(/\{title\}/g, this.data.title).replace(/\{author\}/g, this.data.author);
      this.$node.html(template);
      this.$node.on('click', this.clickHandler);
      $(window).on('new-comment', this.commentHandler);
      this.updateView();
    }

    CouldYouPossibly.prototype.clickHandler = function(e) {
      var $target, next;
      $target = $(e.target);
      next = $target.data('next');
      if (next) {
        this.next(next);
        return this.updateView();
      }
    };

    CouldYouPossibly.prototype.commentHandler = function(e) {
      if (this.data.states.no.active) {
        this.next('thankComment');
        return this.updateView();
      }
    };

    CouldYouPossibly.prototype.next = function(next) {
      var name, state, _ref, _results;
      _ref = this.data.states;
      _results = [];
      for (name in _ref) {
        state = _ref[name];
        if (name === next) {
          _results.push(state.active = true);
        } else {
          _results.push(state.active = false);
        }
      }
      return _results;
    };

    CouldYouPossibly.prototype.updateView = function() {
      var activeStateName;
      activeStateName = null;
      _.each(this.data.states, function(v, k) {
        if (v.active) {
          return activeStateName = k;
        }
      });
      return this.$node.find('.state').each(function() {
        var $el;
        $el = $(this);
        if ($el.hasClass(activeStateName)) {
          return $el.addClass('active');
        } else {
          return $el.removeClass('active');
        }
      });
    };

    return CouldYouPossibly;

  })();

  window.CouldYouPossibly = CouldYouPossibly;

}).call(this);

},{"../i18n/en-US.json":1}]},{},[2]);
