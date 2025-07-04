import { v4 as uuidv4, validate } from "uuid";

class UUID {
  static generate() {
    return uuidv4();
  }

  static validate(id: string) {
    return validate(id);
  }
}

export default UUID;
