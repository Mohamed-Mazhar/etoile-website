import { Type } from "@angular/core";

declare global {
  interface String {
    hasActualValue(): boolean

    toBool(): boolean

    toDate(): Date | null

    formatPoints(): string

    format(...args: any[]): string
  }

}


String.prototype.format = function(...args: string[]): string {
  let formattedString = this.toString();

  args.forEach(arg => {
    formattedString = formattedString.replace('{}', arg.toString());
  });

  return formattedString;
}


String.prototype.toDate = function (this: any | null | undefined): Date | null {
  let value = null;
  if (this !== null && this !== undefined) {
    value = parseInt(this) ? new Date(parseInt(this) * 1000) : null
  }
  return value;
}


String.prototype.hasActualValue = function (this: string | null | undefined): boolean {
  return this !== null && this !== undefined && this.length > 0
}


String.prototype.toBool = function (this: string | null | undefined): boolean {
  return this !== null && this !== undefined && this.length > 0 && this?.toLowerCase() === "true"
}

String.prototype.formatPoints = function (this: string): string {
  if (this.length === 4) {
    return `${this.substring(0, 1)},${this.substring(1)}`
  } else if (this.length === 5) {
    return `${this.substring(0, 2)},${this.substring(2)}`
  } else if (this.length === 6) {
    return `${this.substring(0, 3)},${this.substring(3)}`
  } else return this
}
