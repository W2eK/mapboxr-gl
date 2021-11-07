// @ts-check

class LayerNode {
  /** @param {string} name */
  /** @param {import('mapbox-gl').AnyLayer=} data */
  constructor(name, data) {
    this.name = name;
    this.data = data;
    this.master = !!data;
    this.alive = false;
    this.registered = false;
    /** @type {LayerNode | null} */
    this.next = null;
    /** @type {LayerNode | null} */
    this.prev = null;
    /** @type {LayerNode} */
    this.__first = this;
    // /** @type {Map<Function, boolean>} */
    // this.fuse = new Map();
  }
  get first() {
    if (this.__first === this) return this;
    return this.__first.first;
  }
  /** @param {LayerNode} node */
  set first(node) {
    if (node.next?.__first === node) node.next.__first = node.next;
    if (this.__first !== this) {
      // this.__first.next = node;
      // node.prev = this.__first;
      node.__first = this.__first;
    }
    // node.next = this;
    // this.prev = node;
    this.__first = node;
  }
  /** @returns {LayerNode | null} */
  get after() {
    if (!this.next) return null;
    if (this.next.alive) return this.next;
    return this.next.after;
  }
  /** @returns {string[]} */
  get predecessors() {
    const arr = [];
    if (this.alive) arr.push(this.name);
    if (this.__first !== this) arr.push(...this.__first.predecessors);
    return arr;
  }
  // /** @param {Function} fn @returns {Function} */
  // withFuse(fn) {
  //   return (...args) => {
  //     if (this.fuse.get(fn)) {
  //       console.warn('Infinite Loop');
  //       return null;
  //     } else {
  //       this.fuse.set(fn, true);
  //       const result = fn(...args);
  //       this.fuse.set(fn, false);
  //       return result;
  //     }
  //   };
  // }
  /** @returns {LayerNode} */
  get tail() {
    return this.next ? this.next.tail : this;
  }
}

class LayerList {
  constructor() {
    /** @type {LayerNode} */
    this.first = null;
    this.fuse = new Set();
  }
  /** @param {LayerNode} node @param {LayerNode=} before */
  add(node, before) {
    node.registered = true;
    if (this.first) {
      this.insert(node, before);
    } else {
      this.first = node;
    }
  }
  /** @param {LayerNode} last @param {LayerNode=} before */
  insert(last, before) {
    // ! FIRST and LAST already LINKED!
    const first = last.first;
    const prev = first.prev;
    const next = last.next;
    this.link(prev, next);
    if (before) {
      const prev = before.prev;
      this.link(prev, first);
      this.link(last, before);
    } else {
      const tail = this.tail;
      this.link(tail, first);
    }
  }
  /**
   * @param {LayerNode | undefined} a
   * @param {LayerNode | undefined} b
   */
  link(a = null, b = null) {
    if (a) a.next = b;
    if (b) b.prev = a;
  }
  /** @returns {LayerNode} */
  get tail() {
    return this.first.tail;
  }
  /** @returns {string} */
  print() {
    let last = this.first;
    const names = [];
    while (last) {
      if (names.includes(last.name)) {
        names.push(last.name, '...');
        last = null;
      } else {
        names.push(last.name);
        last = last.next;
      }
    }
    return names.join(' | ');
  }
}

export class LayerCache {
  constructor() {
    this.list = new LayerList();
    /** @type {Object<string, LayerNode>} */
    this.map = {};
  }
  /** @param {string | import('mapbox-gl').AnyLayer} input  */
  create(input) {
    let node, name;
    if (input instanceof Object) {
      // TODO: keep original position
      node = new LayerNode(input.id, input);
      name = input.id;
    } else {
      node = new LayerNode(input);
      name = input;
    }
    this.map[name] = node;
    return node;
  }
  /** @param {string} name @param {string=} beforeId  @returns {string[]} */
  register(name, beforeId) {
    const node = this.get(name) || this.create(name);
    node.alive = true;
    if (beforeId && node.after?.name === beforeId) {
      //
    } else if (beforeId) {
      const next = this.get(beforeId) || this.create(beforeId);
      if (!next.registered) this.list.add(next);
      this.list.add(node, next);
      next.first = node;
    } else if (!node.registered) {
      this.list.add(node);
    }
    return node.predecessors;
    // if(beforeId && )
  }
  /** @param {string} name @returns {string | null} */
  position(name) {
    return this.get(name).after?.name;
  }
  /** @param {string} name @returns {import('mapbox-gl').AnyLayer | Object} */
  data(name) {
    return this.get(name).data;
  }
  /** @param {string} name @returns {LayerNode | undefined} */
  get(name) {
    return this.map[name];
  }
  /** @param {string} name @returns {boolean} */
  has(name) {
    return !!this.get(name);
  }
  /** @param {string} name @returns {boolean} */
  alive(name) {
    return !!this.get(name)?.alive;
  }
  /** @param {string} name */
  kill(name) {
    this.get(name).alive = false;
  }
}
