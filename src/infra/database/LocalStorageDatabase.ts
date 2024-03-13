import { Database } from "../../data/protocols/Database";

export class LocalStorageDatabase<T> implements Database<T> {
  getDocument(documentId: string): T | null {
    const jsonData = localStorage.getItem(documentId);

    if (!jsonData) return null;

    return JSON.parse(jsonData);
  }

  saveDocument(documentId: string, data: T): void {
    localStorage.setItem(documentId, JSON.stringify(data));
  }
}
