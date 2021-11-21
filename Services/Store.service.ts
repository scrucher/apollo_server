import { Store, StoreModel } from "../Models/store.model";

export class StoreService {
    async getAllStores() {
        const found = await StoreModel.find()
        return found;
    }

    async getStoreById() {
        
    }

    async deleteStore() {

    }
    async updateStore() {
        
    }
}