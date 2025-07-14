type Take<T> = (item: T) => T | string;
type Callback<T> = (item?: T, itemCopy?: T, set?: InstanceType<typeof Set<T>>) => void;

const DEFAULT_TAKE: Take<unknown> = (item) => item;
const SET_STRING = "[object Set]";

export default class Set<T> {
  map = new Map();
  take;

  constructor(iterable: Iterable<T>, take: Take<T>) {
    this.take = take || DEFAULT_TAKE;

    if (!iterable) return;

    for (const item of iterable) {
      const uniqueKey = this.take(item);
      this.map.set(uniqueKey, item);
    }
  }

  has(item: T) {
    const uniqueKey = this.take(item);

    return this.map.has(uniqueKey);
  }

  add(item: T) {
    const uniqueKey = this.take(item);
    this.map.set(uniqueKey, item);

    return this;
  }

  toggle(item: T) {
    if (this.has(item)) {
      this.delete(item);
    } else {
      this.add(item);
    }
  }

  clear() {
    this.map.clear();
  }

  delete(item: T) {
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

    const entriesIterator: Iterator<T> = {
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

  foreach(callback: Callback<T>) {
    for (const item of this) callback.apply(this, [item, item, this]);
  }

  get size() {
    return this.map.size;
  }

  difference(other: InstanceType<typeof Set<T>>) {
    const differenceSet = new Set<T>([], this.take);
    const otherSet = new Set<T>(other, this.take);

    for (const item of this) {
      if (otherSet.has(item)) continue;

      differenceSet.add(item);
    }

    return differenceSet;
  }

  #getSetsBySize(other: InstanceType<typeof Set<T>>) {
    const smallerSetName = other.size < this.size ? "other" : "this";

    const otherSet = new Set(other, this.take);

    return {
      smaller: smallerSetName === "other" ? otherSet : this,
      bigger: smallerSetName === "other" ? this : otherSet,
    };
  }

  intersection(other: InstanceType<typeof Set<T>>) {
    const sets = this.#getSetsBySize(other);

    const intersectionSet = new Set<T>([], this.take);

    for (const item of sets.smaller) {
      if (sets.bigger.has(item)) {
        intersectionSet.add(item);
      }
    }

    return intersectionSet;
  }

  isDisjointFrom(other: InstanceType<typeof Set<T>>) {
    const sets = this.#getSetsBySize(other);

    const isDisjoint = !Array.from(sets.smaller).some((item) => sets.bigger.has(item));

    return isDisjoint;
  }

  isSubsetOf(other: InstanceType<typeof Set<T>>) {
    const otherSet = new Set(other, this.take);

    const isSubset = !Array.from(this).some((item) => !otherSet.has(item));

    return isSubset;
  }

  isSupersetOf(other: InstanceType<typeof Set<T>>) {
    const otherSet = new Set(other, this.take);

    const isSuperset = !Array.from(otherSet).some((item) => !this.has(item));

    return isSuperset;
  }

  union(other: InstanceType<typeof Set<T>>) {
    const unionArray = Array.from([...this, ...other]);
    const unionSet = new Set(unionArray, this.take);

    return unionSet;
  }

  symmetricDifference(other: InstanceType<typeof Set<T>>) {
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
