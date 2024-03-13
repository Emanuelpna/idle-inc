export interface Database<T> {
  getDocument(documentId: string): T | null;
  saveDocument(documentId: string, data: T): void;
}
