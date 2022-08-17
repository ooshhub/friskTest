export class Helpers {

  // Grab class and id info from an element
  static splitSelector(selector) {
    if (typeof(selector) !== 'string') return;
    const id = selector.match(/#([\w]+)/);
    const classes = selector.matchAll(/\.([\w]+)/g) ?? [];
    return {
      id: id?.[1] ?? null,
      classes: Array.from(classes)?.map(v => v[1]),
    }
  }

  // Prompt user to download text file from string
  static saveTextToFile(text, filename) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL( new Blob([text], { type:`text/plain` }) );
    a.download = filename;
    a.click();
    a.remove();
  }

  static stringToBase64(str) {
    return encodeURIComponent(window.btoa(str));
  }

  static base64ToString(str) {
    return window.atob(decodeURIComponent(str));
  }
  
}