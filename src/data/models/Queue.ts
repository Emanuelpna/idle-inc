export class Queue<T> {
  public size = 0;

  protected _queue: T[] = [];

  protected _enqueue(value: T) {
    this._queue.push(value);

    this.size++;
  }

  protected _dequeue() {
    const value = this._queue.shift();

    this.size--;

    return value;
  }
}
