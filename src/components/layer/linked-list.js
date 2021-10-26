// @ts-check
import { AnyLayer } from 'mapbox-gl';

class LayerNode {
  /** @param {string} name */
  /** @param {AnyLayer=} data */
  constructor(name, data) {
    this.name = name;
    /** @type {LayerNode} */
    this.next = null;
    /** @type {LayerNode} */
    this.prev = null;
    this.alive = true;
    this.data = data;
    this.master = !!data;
  }
  /** @returns {LayerNode | undefined} */
  before() {
    if (!this.next) return;
    if (this.next.alive) return this.next;
    return this.next.before();
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
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return;
    }
    if (!before) {
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
    /** @private */
    this.list = new LayerList();
    /** @type {Object<string, LayerNode>} */
    this.map = {};
  }
  /** @param {string | AnyLayer} input @param {string=} beforeId */
  create(input, beforeId) {
    let node, name;
    if (typeof input === 'object') {
      node = new LayerNode(input.id, input);
      name = `__${input.id}`;
    } else {
      node = new LayerNode(input);
      name = input;
    }
    this.map[name] = node;
    this.list.add(node, this.get(beforeId));
  }
  /** @param {string} name @param {boolean=} reverse @returns {LayerNode | undefined} */
  get(name, reverse) {
    if (reverse) return this.map[name];
    return this.map[`__${name}`] ?? this.map[name];
  }
  /** @param {string} name @param {string=} beforeId */
  register(name, beforeId) {
    const node = this.get(name, true);
    if (!node) {
      this.create(name, beforeId);
    } else {
      this.alive(name, true);
      const next = this.before(beforeId);
      if (beforeId && beforeId !== next) {
        this.list.remove(node);
        this.list.add(node);
      }
    }
  }
  /** @param {string} name @param {boolean=} reverse */
  alive(name, reverse) {
    return this.get(name, reverse).alive;
  }
  /** @param {string} name @param {boolean=} reverse */
  kill(name, reverse) {
    this.get(name, reverse).alive = false;
  }
  /** @param {string} name @param {boolean=} reverse */
  revive(name, reverse) {
    this.get(name, reverse).alive = true;
  }
  /** @param {string} name @returns {AnyLayer} */
  data(name) {
    return this.get(name).data;
  }
  /** @param {string} name @param {boolean=} reverse @returns {string} */
  before(name, reverse) {
    return this.get(name, reverse)?.before()?.name;
  }
  /** @param {string} name @returns {string} */
  after(name) {
    const next = this.get(name).next;
    return this.before(next.name, true);
  }
}
