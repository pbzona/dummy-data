export class Model {
  constructor() {
    this.additionalFields = [];
  }

  addField(fieldName, value) {
    this.additionalFields.push(fieldName);
    this[fieldName] = value;
  }

  serialize() {
    throw new Error("serialize() method should be overridden by subclass");
  }
}

export class ModelList {
  constructor(count) {
    this.ids = Array.from({ length: count }, (_, idx) => idx + 1);
  }

  get elements() {
    throw new Error("subclass must define elements to return");
  }

  get length() {
    return this.elements.length;
  }

  getRandom() {
    return this.elements[Math.floor(Math.random() * this.elements.length)];
  }

  addOneToOneReference(toModelList, fieldName) {
    console.log("ADD REF", toModelList.elements);
    for (const model of toModelList.elements) {
      model.addField(fieldName, this.getRandom().id);
    }
  }

  init() {
    throw new Error("init() method should be overridden by subclass");
  }

  serialize() {
    return this.elements.map((element) => {
      return element.serialize();
    });
  }
}
