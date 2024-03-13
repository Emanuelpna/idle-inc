export interface Repository<T> {
  getAll(): T | null;
  save(data: T): void;
}
