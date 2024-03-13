import { Database } from "../protocols/Database";
import { Repository } from "../protocols/Repository";

export class BankRepository<T> implements Repository<T> {
  private _documentId = "IdleInc-BankBackup";

  constructor(private _db: Database<T>) {}

  getAll() {
    return this._db.getDocument(this._documentId);
  }

  save(data: T) {
    this._db.saveDocument(this._documentId, data);
  }
}
