export class Helpers {

  static splitSelector(selector) {
    if (typeof(selector) !== 'string') return;
    const id = selector.match(/#([\w]+)/);
    const classes = selector.matchAll(/\.([\w]+)/g) ?? [];
    return {
      id: id?.[1] ?? null,
      classes: Array.from(classes)?.map(v => v[1]),
    }
  }
  
}