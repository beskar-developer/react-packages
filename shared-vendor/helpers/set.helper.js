const DEFAULT_TAKE = (item) => item;
const SET_STRING = "[object Set]";

export default class Set {
  map = new Map();
  take;

  constructor(iterator, take) {
    this.take = take || DEFAULT_TAKE;

    if (!iterator) return;

    for (const item of iterator) {
      const uniqueKey = this.take(item);
      this.map.set(uniqueKey, item);
    }
  }

  has(item) {
    const uniqueKey = this.take(item);

    return this.map.has(uniqueKey);
  }

  add(item) {
    const uniqueKey = this.take(item);
    this.map.set(uniqueKey, item);

    return this;
  }

  toggle(item) {
    if (this.has(item)) {
      this.delete(item);
    } else {
      this.add(item);
    }
  }

  clear() {
    this.map.clear();
  }

  delete(item) {
    const uniqueKey = this.take(item);

    return this.map.delete(uniqueKey);
  }

  entries() {
    const mapIterator = this.map.values();

    const entriesIterator = {
      next() {
        const iterator = mapIterator.next();
        iterator.value = [iterator.value, iterator.value];

        return iterator;
      },
    };

    return entriesIterator;
  }

  static get [Symbol.species]() {
    return Set;
  }

  [Symbol.iterator]() {
    const mapIterator = this.map.values();

    const entriesIterator = {
      next() {
        const iterator = mapIterator.next();

        return iterator;
      },
    };

    return entriesIterator;
  }

  values() {
    return this[Symbol.iterator]();
  }

  keys() {
    return this[Symbol.iterator]();
  }

  foreach(callback) {
    for (const item of this) {
      callback.apply(this, [item, item, this]);
    }
  }

  get size() {
    return this.map.size;
  }

  difference(other) {
    const differenceSet = new Set([], this.take);
    const otherSet = new Set(other, this.take);

    for (const item of this) {
      if (!otherSet.has(item)) differenceSet.add(item);
    }

    return differenceSet;
  }

  #getSetsBySize(other) {
    const smallerSetName = other.size < this.size ? "other" : "this";

    const otherSet = new Set(other, this.take);

    return {
      smaller: smallerSetName === "other" ? otherSet : this,
      bigger: smallerSetName === "other" ? this : otherSet,
    };
  }

  intersection(other) {
    const sets = this.#getSetsBySize(other);

    const intersectionSet = new Set([], this.take);

    for (const item of sets.smaller) {
      if (sets.bigger.has(item)) {
        intersectionSet.add(item);
      }
    }

    return intersectionSet;
  }

  isDisjointFrom(other) {
    const sets = this.#getSetsBySize(other);

    const isDisjoint = !Array.from(sets.smaller).some((item) => sets.bigger.has(item));

    return isDisjoint;
  }

  isSubsetOf(other) {
    const otherSet = new Set(other, this.take);

    const isSubset = !Array.from(this).some((item) => !otherSet.has(item));

    return isSubset;
  }

  isSupersetOf(other) {
    const otherSet = new Set(other, this.take);

    const isSuperset = !Array.from(otherSet).some((item) => !this.has(item));

    return isSuperset;
  }

  union(other) {
    const unionArray = Array.from([...this, ...other]);
    const unionSet = new Set(unionArray, this.take);

    return unionSet;
  }

  symmetricDifference(other) {
    const otherSet = new Set(other, this.take);

    return otherSet.difference(this).union(this.difference(otherSet));
  }

  toString() {
    return SET_STRING;
  }

  toLocaleString() {
    return this.toString();
  }

  toArray() {
    return Array.from(this);
  }
}
