import { ScientificNumber } from "./ScientificNumber";

export class ScientificNumberCalculator {
  static sum(a: ScientificNumber, b: ScientificNumber) {
    if (a.number === 0) {
      return new ScientificNumber(a.number + b.number, b.expoent).normalize();
    }

    if (b.number === 0) {
      return new ScientificNumber(a.number + b.number, a.expoent).normalize();
    }

    if (a.expoent == b.expoent) {
      return new ScientificNumber(a.number + b.number, a.expoent).normalize();
    }

    var expoentDifference = a.expoent - b.expoent;

    var biggerNumber = a.expoent < b.expoent ? b : a;
    var smallerNumber = a.expoent < b.expoent ? a : b;

    for (var index = 0; index < Math.abs(expoentDifference); index++) {
      smallerNumber.incrementExpoent();
    }

    biggerNumber.expoent = smallerNumber.expoent;

    return new ScientificNumber(
      biggerNumber.number + smallerNumber.number,
      smallerNumber.expoent
    ).normalize();
  }

  static subtract(a: ScientificNumber, b: ScientificNumber) {
    if (a.number === 0) {
      return new ScientificNumber(a.number - b.number, b.expoent).normalize();
    }

    if (b.number === 0) {
      return new ScientificNumber(a.number - b.number, a.expoent).normalize();
    }

    if (a.expoent == b.expoent) {
      return new ScientificNumber(a.number - b.number, a.expoent).normalize();
    }

    var expoentDifference = a.expoent - b.expoent;

    var biggerNumber = a.expoent < b.expoent ? b : a;
    var smallerNumber = a.expoent < b.expoent ? a : b;

    for (var index = 0; index < Math.abs(expoentDifference); index++) {
      biggerNumber.decrementExpoent();
    }

    smallerNumber.expoent = biggerNumber.expoent;

    return new ScientificNumber(
      smallerNumber.number - biggerNumber.number,
      smallerNumber.expoent
    ).normalize();
  }

  static multiply(a: ScientificNumber, b: ScientificNumber | number) {
    if (typeof b === "number") {
      return new ScientificNumber(a.number * b, a.expoent).normalize();
    }

    if (a.number === 0) {
      return new ScientificNumber(a.number * b.number, b.expoent).normalize();
    }

    if (b.number === 0) {
      return new ScientificNumber(a.number * b.number, a.expoent).normalize();
    }

    if (a.expoent == b.expoent) {
      return new ScientificNumber(a.number * b.number, a.expoent).normalize();
    }

    var expoentDifference = a.expoent - b.expoent;

    var a_reference = new ScientificNumber(a.number, a.expoent);
    var b_reference = new ScientificNumber(b.number, b.expoent);

    var bumpLevels = Math.abs(expoentDifference);

    if (expoentDifference >= 0) b_reference.bumpExpoent(bumpLevels);
    else a_reference.bumpExpoent(bumpLevels);

    return new ScientificNumber(
      a_reference.number * b_reference.number,
      a_reference.expoent
    ).normalize();
  }
}
