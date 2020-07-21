if (!__DEV__) {
  console.log =
  console.info =
  console.error =
  console.warn =
  console.debug =
  console.trace = () => {};
}

export function log() {
  _d('log', arguments);
}

export function info() {
  _d('info', arguments);
}

export function warn() {
  _d('warn', arguments);
}

export function error() {
  _d('error', arguments);
}

export function debug() {
  _d('debug', arguments);
}

export function trace() {
  _d('trace', arguments);
}

function _d(type, args) {
  if (!__DEV__) return;
  if (args[0]) {
    args[0] = _getHeader() + args[0];
  }
  Function.apply.call(console[type], console, args);
}

function _getHeader() {
  var date = new Date();

  var d = date.getDay();
  if (d.toString().length == 1)
    d = '0' + d;

  var m = date.getMonth() + 1;
  if (m.toString().length == 1)
    m = '0' + m;

  var y = date.getFullYear();

  var h = date.getHours();
  if (h.toString().length == 1)
    h = '0' + h;

  var mn = date.getMinutes();
  if (mn.toString().length == 1)
    mn = '0' + mn;

  var s = date.getSeconds();
  if (s.toString().length == 1)
    s = '0' + s;

  var ms = date.getMilliseconds();
  var time = d + '/' + m + '/' + y + ' ' + h + ':' + mn + ':' + s + ' ' + ms;
  return '[GPLX ' + time + '] ';
}