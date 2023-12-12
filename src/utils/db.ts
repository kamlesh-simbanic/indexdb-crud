import { IDBPDatabase, openDB } from 'idb';

const tableNames = ["users"]

class IndexedDb {
    private database: string = 'test';
    public db: any;

    constructor() {
    }

    public async createObjectStore() {
        try {
            this.db = await openDB(this.database, 1, {
                upgrade(db: IDBPDatabase) {
                    for (const tableName of tableNames) {
                        if (db.objectStoreNames.contains(tableName)) {
                            continue;
                        }
                        db.createObjectStore(tableName, { autoIncrement: true, keyPath: 'id' });
                    }
                },
            });
        } catch (error) {
            return false;
        }
    }

    public async getValue(tableName: string, id: number) {
        try {
            const tx = this.db.transaction(tableName, 'readonly');
            const store = tx.objectStore(tableName);
            const result = await store.get(id);
            console.log('Get Data ', JSON.stringify(result));
            return result;
        } catch (error) {
            return null
        }
    }

    public async getAllValue(tableName: string) {
        try {
            const tx = this.db.transaction(tableName, 'readonly');
            const store = tx.objectStore(tableName);
            const result = await store.getAll();
            console.log('Get All Data', JSON.stringify(result));
            return result;
        } catch (error) {
            return [];
        }
    }

    public async putValue(tableName: string, value: object) {
        try {
            const tx = this.db.transaction(tableName, 'readwrite');
            const store = tx.objectStore(tableName);
            const result = await store.put(value);
            console.log('Put Data ', JSON.stringify(result));
            return result;
        } catch (error) {
            return null
        }
    }

    public async putBulkValue(tableName: string, values: object[]) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        for (const value of values) {
            const result = await store.put(value);
            console.log('Put Bulk Data ', JSON.stringify(result));
        }
        return this.getAllValue(tableName);
    }

    public async deleteValue(tableName: string, id: number) {
        try {
            const tx = this.db.transaction(tableName, 'readwrite');
            const store = tx.objectStore(tableName);
            const result = await store.get(id);
            if (!result) {
                console.log('Id not found', id);
                return result;
            }
            await store.delete(id);
            console.log('Deleted Data', id);
            return id;
        } catch (error) {
            return null
        }
    }
}

export default IndexedDb;