// @ts-check
import { AnyLayer } from 'mapbox-gl';

class LayerNode {
  /** @param {AnyLayer} data */
  constructor(data) {
    this.data = data;
    /** @type {LayerNode} */
    this.next = null;
    /** @type {LayerNode} */
    this.prev = null;
    this.alive = false;
  }
}

export class LayerList {
  constructor() {
    /** @type {LayerNode} */
    this.tail = null;
    /** @type {LayerNode} */
    this.head = null;
    /** @type {Object<string, LayerNode>} */
    this.map = {};
  }

  /**
   * @param {AnyLayer|undefined} data
   * @param {string=} beforeId
   */
  insert(data, beforeId) {
    const node = new LayerNode(data);
    if (!this.head) this.head = node;
    if (!this.tail) {
      this.tail = node;
    } else if (!beforeId) {
      this.push(node);
    } else {
      const next = this.get(beforeId);
      if (!next) {
        this.push(node);
      } else {
        const prev = next.prev;
        if (!prev) {
          this.shift(node);
        } else {
          next.prev = node;
          prev.next = node;
        }
      }
    }
    this.map[data.id] = node;
    // return node.next.data.id;
  }
  /** @param {LayerNode} node */
  shift(node) {
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }
  /** @param {LayerNode} node */
  push(node) {
    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }
  /**
   * @param {string} id
   * @returns {LayerNode}
   */
  get(id) {
    return this.map[`__${id}`] || this.map[id];
  }
  /** @param {string} id */
  kill(id) {
    const layer = this.get(id);
    layer.alive = false;
  }
  /** @param {string} id */
  revive(id) {
    const layer = this.get(id);
    layer.alive = true;
  }
}
