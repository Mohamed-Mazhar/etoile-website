import { Type } from "@angular/core";

declare global {
  interface Array<T> {
    filterType<TARGET>(this: Array<T>, type: Type<TARGET>): TARGET[];

    first(this: Array<T>): T | null;

    last(this: Array<T>): T | null;

    equal(this: Array<number>, other: Array<number>): boolean

    isNotEmpty(this: Array<T>): boolean;
    isEmpty(this: Array<T>): boolean;
  }
}

Array.prototype.isNotEmpty = function () {
  return this.length > 0
}

Array.prototype.isEmpty = function () {
  return this?.length == 0
}


Array.prototype.filterType = function <TARGET>(type: Type<TARGET>): TARGET[] {
  return this.filter(item => item instanceof type).map(item => item as TARGET)
}

Array.prototype.first = function () {
  return this.length > 0 ? this[0] : null
}
Array.prototype.last = function () {
  return this.length > 0 ? this[this.length - 1] : null
}

Array.prototype.equal = function (other: Array<number>): boolean {
  const superSet: any = {}

  for (const i of this) {
    const e = i + typeof i
    superSet[e] = 1
  }

  for (const i of other) {
    const e = i + typeof i

    if (!superSet[e]) return false

    superSet[e] = 2
  }

  for (let e in superSet) {
    if (superSet[e] === 1) return false
  }

  return true
}
