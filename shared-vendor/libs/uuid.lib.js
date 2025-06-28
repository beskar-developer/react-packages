import { v4 as uuidv4, validate } from "uuid";

const uuid = {
  generate() {
    return uuidv4();
  },
  validate(id) {
    return validate(id);
  },
};

export default uuid;
