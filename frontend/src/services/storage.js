export class StorageService {
  static async saveToIndexedDB(storeName, key, value) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('FasoSuku', 1)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const db = request.result
        const tx = db.transaction(storeName, 'readwrite')
        const store = tx.objectStore(storeName)
        store.put({ key, value, timestamp: Date.now() })
        tx.oncomplete = () => resolve()
      }
      request.onupgradeneeded = (e) => {
        const db = e.target.result
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName)
        }
      }
    })
  }

  static async getFromIndexedDB(storeName, key) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('FasoSuku', 1)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const db = request.result
        const tx = db.transaction(storeName, 'readonly')
        const store = tx.objectStore(storeName)
        const query = store.get(key)
        query.onsuccess = () => resolve(query.result?.value || null)
      }
    })
  }

  static getFromLocalStorage(key) {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('LocalStorage error:', error)
      return null
    }
  }

  static setInLocalStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('LocalStorage error:', error)
    }
  }
}
