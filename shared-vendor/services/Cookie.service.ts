import Cookies from "js-cookie";

type SetParameters = Parameters<typeof Cookies.set>;

class Cookie {
  set(key: SetParameters[0], value: SetParameters[1], options?: SetParameters[2]) {
    return Cookies.set(key, value, options);
  }

  get(key: SetParameters[0]) {
    return Cookies.get(key);
  }

  remove(key: SetParameters[0]) {
    return Cookies.remove(key);
  }
}

export default new Cookie();
