import Redis from 'ioredis';
import { ICacheService } from '../../core/interfaces/ICacheService';

class RedisCacheService implements ICacheService {
  private redisClient: Redis;

  constructor() {
    // Busca a URL do Redis das variáveis de ambiente ou usa um valor padrão.
    // Importante: No docker, REDIS_URL costuma ser 'redis://redis:6379'
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    
    this.redisClient = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        // Tenta reconectar até 10 vezes, com um intervalo crescente
        if (times > 10) {
          console.error('Redis: Limite de tentativas de conexão excedido.');
          return null; // para de tentar
        }
        return Math.min(times * 100, 3000);
      }
    });

    this.redisClient.on('connect', () => {
      console.log('✅ Conectado ao Redis com sucesso!');
    });

    this.redisClient.on('error', (err) => {
      console.error('❌ Erro na conexão com o Redis:', err.message);
    });
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.redisClient.get(key);
      if (!data) return null;
      
      return JSON.parse(data) as T;
    } catch (error) {
      console.error(`Erro ao buscar chave ${key} no Redis:`, error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttlInSeconds?: number): Promise<void> {
    try {
      const stringifiedValue = JSON.stringify(value);
      
      if (ttlInSeconds) {
        // EX = tempo em segundos
        await this.redisClient.set(key, stringifiedValue, 'EX', ttlInSeconds);
      } else {
        await this.redisClient.set(key, stringifiedValue);
      }
    } catch (error) {
      console.error(`Erro ao salvar chave ${key} no Redis:`, error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.redisClient.del(key);
    } catch (error) {
      console.error(`Erro ao deletar chave ${key} no Redis:`, error);
    }
  }

  async delByPrefix(prefix: string): Promise<void> {
    try {
      const keys = await this.redisClient.keys(`${prefix}*`);
      if (keys.length > 0) {
        await this.redisClient.del(...keys);
      }
    } catch (error) {
      console.error(`Erro ao deletar chaves com prefixo ${prefix} no Redis:`, error);
    }
  }

  async clearAll(): Promise<void> {
    try {
      await this.redisClient.flushdb();
    } catch (error) {
      console.error('Erro ao limpar banco de dados do Redis:', error);
    }
  }

  // Método opcional para desligar o Redis (útil em testes ou encerramento gracioso)
  async disconnect(): Promise<void> {
    await this.redisClient.quit();
  }
}

// Exporta como um Singleton para ser reutilizado na aplicação inteira
export const cacheService = new RedisCacheService();
