// @ts-check

class LayerNode {
  /** @param {string} name */
  /** @param {import('mapbox-gl').AnyLayer=} data */
  constructor(name, data) {
    this.name = name;
    /** @type {LayerNode} */
    this.next = null;
    /** @type {LayerNode} */
    this.prev = null;
    this.alive = false;
    this.registered = false;
    this.data = data;
    this.master = !!data;
    /** @type {LayerNode[]} */
    this.predecessors = [];
  }
  /** @returns {LayerNode | undefined} */
  before() {
    if (!this.prev) return this.alive ? this : this.after();
    if (this.prev.alive) return this.prev;
    return this.prev.before();
  }
  /** @returns {LayerNode | undefined} */
  after() {
    if (!this.next) return undefined;
    if (this.next.alive) return this.next;
    return this.next.after();
  }
  /**
   * @param {LayerNode | undefined} a
   * @param {LayerNode | undefined} b
   */
  static link(a = null, b = null) {
    if (a) a.next = b;
    if (b) b.prev = a;
  }
}

class LayerList {
  constructor() {
    /** @type {LayerNode} */
    this.tail = null;
    /** @type {LayerNode} */
    this.head = null;
  }
  /** @param {LayerNode} node @param {LayerNode=} before */
  add(node, before) {
    node.registered = true;
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return;
    }
    if (node.predecessors.length) {
      this.splice(node.predecessors, node, before);
    } else if (!before) {
      this.push(node);
    } else if (!before.prev) {
      this.unshift(node);
    } else {
      this.insert(node, before.prev, before);
    }
  }
  /** @param {LayerNode} node @param {LayerNode} prev @param {LayerNode} next */
  insert(node, prev, next) {
    prev.next = node;
    next.prev = node;
    node.next = next;
    node.prev = prev;
  }
  /** @param {LayerNode} node */
  push(node) {
    if (this.tail === node) return;
    const prev = this.tail;
    node.prev = prev;
    prev.next = node;
    this.tail = node;
  }
  /** @param {LayerNode} node */
  unshift(node) {
    const next = this.head;
    node.next = next;
    next.prev = node;
    this.head = node;
  }
  pop() {
    const tail = this.tail;
    const prev = tail.prev;
    tail.prev = null;
    prev.next = null;
    this.tail = prev;
  }
  shift() {
    const head = this.head;
    const next = head.next;
    head.next = null;
    next.prev = null;
    this.head = next;
  }
  /** @param {LayerNode[]} nodes @param {LayerNode} last @param {LayerNode=} before */
  splice(nodes, last, before) {
    const [first] = nodes;
    const prev = first.prev;
    const next = last.next;
    LayerNode.link(prev, next);
    if (before) {
      const prev = before.prev;
      LayerNode.link(last, before);
      LayerNode.link(prev, first);
    } else {
      const tail = this.tail;
      LayerNode.link(tail, first);
      this.tail = last;
      last.next = null;
    }
  }
  /** @param {LayerNode} node */
  remove(node) {
    const next = node.next;
    const prev = node.prev;
    if (!next) return this.pop();
    if (!prev) return this.shift();
    next.prev = prev;
    prev.next = next;
    node.next = null;
    node.prev = null;
  }
  /** @param {LayerNode} node @returns {string} */
  print(node = this.head) {
    return node.next ? node.name + ' | ' + this.print(node.next) : node.name;
  }
}

export class LayerCache {
  constructor() {
    this.list = new LayerList();
    /** @type {Object<string, LayerList>} */
    this.queue = {};
    /** @type {Object<string, LayerNode>} */
    this.map = {};
  }
  /** @param {string | import('mapbox-gl').AnyLayer} input @param {boolean} alive  */
  create(input, alive = true) {
    let node, name;
    if (typeof input === 'object') {
      node = new LayerNode(input.id, input);
      name = `__${input.id}`;
    } else {
      node = new LayerNode(input);
      name = input;
    }
    this.map[name] = node;
    node.alive = alive;
    /*
    if (!beforeId) {
      this.list.add(node);
    } else {
      const before = this.get(beforeId);
      if (before) {
        this.list.add(node, before);
      } else {
        const before = this.create(beforeId);
        before.alive = false;
        before.predecessors.push(node);
        this.list.add(node, before);
      }
    }
    */
    return node;
  }
  /** @param {string} name @param {boolean=} exact @returns {LayerNode | undefined} */
  get(name, exact) {
    if (exact) return this.map[name];
    return this.map[`__${name}`] ?? this.map[name];
  }
  /** @param {string} name @param {boolean=} exact @returns {boolean} */
  has(name, exact) {
    return !!this.get(name, exact);
  }
  /** @param {string} name @param {string=} beforeId @returns {string[]} */
  register(name, beforeId) {
    const node = this.get(name, true) || this.create(name);
    node.alive = true;
    if (beforeId && node.after()?.name === beforeId) {
      return node.predecessors.map(({ name }) => name);
    } else if (beforeId) {
      const next = this.get(beforeId) || this.create(beforeId, false);
      if (node.registered) {
        this.list.remove(node);
      }
      if (!next.alive) {
        next.predecessors.push(node);
        this.list.push(next);
      }
      this.list.add(node, next);
    } else if (!node.registered) {
      this.list.add(node);
    }
    return node.predecessors.map(({ name }) => name);
  }
  /** @param {string} name @param {boolean=} exact */
  alive(name, exact) {
    return this.get(name, exact).alive;
  }
  /** @param {string} name @param {boolean=} exact */
  kill(name, exact) {
    this.get(name, exact).alive = false;
  }
  /** @param {string} name @param {boolean=} exact */
  revive(name, exact) {
    this.get(name, exact).alive = true;
  }
  /** @param {string} name @returns {string | null} */
  position(name) {
    return this.get(name, true).after()?.name;
  }
  /** @param {string} name @returns {import('mapbox-gl').AnyLayer} */
  data(name) {
    return this.get(name).data;
  }
  // /** @param {string} name @param {boolean=} exact @returns {string} */
  // before(name, exact) {
  //   return this.get(name, exact)?.before()?.name;
  // }
  // /** @param {string} name @param {boolean=} exact @returns {string} */
  // after(name, exact) {
  //   return this.get(name, exact)?.after()?.name;
  // }
}
