
Array.prototype.shuffle=function() {
  this.sort(function() { return Math.random()-0.5;});
};
Array.prototype.remove = function(from, to) {
  var array=this;
  var rest = array.slice((to || from) + 1 || array.length);
  array.length = from < 0 ? array.length + from : from;
  return array.push.apply(array, rest);
};
Array.prototype.erase=function(e) {
  this.remove(this.indexOf(e));
};
Array.prototype.shallowCopy=function() {
  return this.slice(0);
};
Array.prototype.pushAll=function(other) {
  var self=this;
  $.each(other,function(k,v) {
    self.push(v);
  });
};
var Signal=function() {
  var listeners=[];
  this.call=function() {
    var args=arguments;
    $.each(listeners,function(k,listener) {
      listener.fct.apply(listener.obj,args);
    });
  };
  this.add=function(receiver,fct) {
    listeners.push({fct:fct,obj:receiver});
  }
};

var Position=function(x,y) {
  this.x=x;
  this.y=y;
}
