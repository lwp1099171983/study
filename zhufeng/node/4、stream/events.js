function EventEmitter() {
  this._events = {};
}

EventEmitter.prototype.on = function (event, listener) {
  if (!this._events) {
    this._events = {}; // 如果当前实例不具备_events 属性，则添加一个
  }
  const listeners = this._events[event] || [];
  if (event !== "newListener") {
    this.emit("newListener", event);
  }
  listeners.push(listener);
  this._events[event] = listeners;
};

EventEmitter.prototype.emit = function (event, ...args) {
  if (!this._events) {
    this._events = {}; // 如果当前实例不具备_events 属性，则添加一个
  }
  const listeners = this._events[event] || [];
  listeners &&
    listeners.length &&
    listeners.forEach((listener) => {
      listener(...args);
    });
};

EventEmitter.prototype.off = function (event, listener) {
  if (!this._events) {
    this._events = {}; // 如果当前实例不具备_events 属性，则添加一个
  }
  let listeners = this._events[event] || [];
  if (listeners && listeners.length) {
    this._events[event] = listeners.filter((l) => {
      return l != listener && listener.l != l;
    });
  }
};

EventEmitter.prototype.once = function (event, listener) {
  if (!this._events) {
    this._events = {}; // 如果当前实例不具备_events 属性，则添加一个
  }
  // 函数切片
  const wrapper = (...args) => {
    listener(...args);
    this.off(event, wrapper);
  };
  wrapper.l = wrapper;
  this.on(event, wrapper);
};

module.exports = EventEmitter;
