var dom = require('jmas/dom');
var dialogHtml = 
'<div data-dialog class="ui-dialog">'+
  '<div class="ui-dialog-navbar">'+
    '<div data-title class="ui-dialog-title"></div>'+
    '<div data-navset-first class="ui-dialog-navset-first"></div>'+
    '<div data-navset-second class="ui-dialog-navset-second"></div>'+
  '</div>'+
  '<div data-content></div>'+
'</div>';

var UiDialog = function(options) {
  options = typeof options !== 'undefined' ? options: {};
  this.parent = typeof options.parent !== 'undefined' ? options.parent: null;

  if (typeof options.width !== 'undefined') {
    this.width = options.width;
  }
  if (typeof options.height !== 'undefined') {
    this.height = options.height;
  }

  this.el = document.createElement('DIV');
  this.el.classList.add('ui-dialog-container');

  this.contentEl = document.createElement('DIV');
  this.navsetFirstEl = document.createElement('DIV');
  this.navsetSecondEl = document.createElement('DIV');

  this.buildSkeleton();
  this.updateSize(this.width, this.height);
  
  this.titleEl = dom.query(this.el, '[data-title]');
  this.dialogEl = dom.query(this.el, '[data-dialog]');
};

UiDialog.prototype.parent = null;
UiDialog.prototype.width = 500;
UiDialog.prototype.height = 400;
UiDialog.prototype.el = null;
UiDialog.prototype.contentEl = null;
UiDialog.prototype.navsetFirstEl = null;
UiDialog.prototype.navsetSecondEl = null;
UiDialog.prototype.dialogEl = null;
UiDialog.prototype.titleEl = null;

UiDialog.prototype.buildSkeleton = function() {
  dom.replaceHtml(this.el, dialogHtml);
  dom.query(this.el, '[data-content]').appendChild(this.contentEl);
  dom.query(this.el, '[data-navset-first]').appendChild(this.navsetFirstEl);
  dom.query(this.el, '[data-navset-second]').appendChild(this.navsetSecondEl);
  dom.body().appendChild(this.el);
};

UiDialog.prototype.open = function() {
  this.el.classList.add('active');
};

UiDialog.prototype.close = function() {
  this.el.classList.remove('active');

  if (this.parent) {
    this.parent.open();
  }
};

UiDialog.prototype.updateSize = function(width, height) {
  this.width = parseInt(width);
  this.height = parseInt(height);
  this.dialogEl.style.width = this.width + 'px';
  this.dialogEl.style.height = this.height + 'px';
};

module.exports = UiDialog;
