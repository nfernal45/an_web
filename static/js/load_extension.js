function isExtensionNeeded() {
  if (isIE()) return false;
  if (browserSpecs.name == 'Edge') { return true; }
  if (browserSpecs.name == 'Opera') { if (browserSpecs.version >= 33) { return true; } else { return false; } }
  if (browserSpecs.name == 'Firefox') { if (browserSpecs.version >= 52) { return true; } else { return false; } }
  if (browserSpecs.name == 'Chrome') { if (browserSpecs.version >= 42) { return true; } else { return false; } }
  if (browserSpecs.name == 'Safari') { if (browserSpecs.version >= 11) { return true; } else { return false; } }
  return true;
}

if(!isExtensionNeeded()) {
  window.cadesplugin_extension_loaded = true;
  setStateForExtension("green", "Расширение не требуется");
}

function loadExtensions() {
  var canPromise = !!window.Promise;
  if (isEdge()) {
    ShowEdgeNotSupported();
  } else {
    if (canPromise) {
      console.log("check for plugin")
      console.log(cadesplugin)
      cadesplugin.then(
        function() {
          console.log("check for plugin then")
          Common_CheckForPlugIn();
        },
        function(error) {
          console.log("check for plugin error")
          console.log(error)
          if (window.cadesplugin_extension_loaded) {
            setStateForPlugin("red", error);
          }
        }
      );
    } else {
      window.addEventListener(
        "message",
        function(event) {
          if (event.data == "cadesplugin_loaded") {
            CheckForPlugIn_NPAPI();
          } else if (event.data == "cadesplugin_load_error") {
            if (window.cadesplugin_extension_loaded) {
              setStateForPlugin("red", "Плагин не загружен");
            }
          }
        },
        false
      );
      window.postMessage("cadesplugin_echo_request", "*");
    }
  }
}

document.loadExtensions = loadExtensions
