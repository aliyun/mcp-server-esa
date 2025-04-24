import { ApiServer } from "./service";
import { LRUCache } from "lru-cache";

class ApiServerManager {
  // Initialize LRUCache with configuration
  static apiServers: LRUCache<string, ApiServer> = new LRUCache({
    max: 100, // Maximum number of ApiServer instances to store
    ttl: 1000 * 60 * 60, // Optional: Time-to-live in milliseconds (e.g., 1 hour)
    ttlAutopurge: true, // Automatically remove expired entries
  });

  static async getApiServerById(id: string): Promise<ApiServer | undefined> {
    return this.apiServers.get(id);
  }

  static async addApiServer(
    sessionId: string,
    accessKeyId: string,
    accessKeySecret: string
  ): Promise<void> {
    const apiServer = new ApiServer(accessKeyId, accessKeySecret);
    this.apiServers.set(sessionId, apiServer);
  }

  static async deleteApiServer(id: string): Promise<void> {
    this.apiServers.delete(id);
  }

  static async removeAllApiServers(): Promise<void> {
    this.apiServers.clear();
  }
}

export default ApiServerManager;
