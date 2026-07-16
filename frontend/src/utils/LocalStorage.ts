class LocalStorage {
  private static instance: LocalStorage;

  private constructor() {}

  public static getInstance() {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }
    return LocalStorage.instance;
  }

  public get<T>(key: string) {
    const jsonStringify = localStorage.getItem(key);

    if (jsonStringify) {
      const data: T = JSON.parse(jsonStringify as string) as T;

      return data;
    }

    return null;
  }

  public set<T>(key: string, data: T) {
    const json = JSON.stringify(data);

    localStorage.setItem(key, json);
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }
}

export { LocalStorage };
