export interface ICacheService {
  /**
   * Recupera um valor do cache.
   * @param key A chave do item no cache.
   * @returns O valor em cache ou null se não for encontrado.
   */
  get<T>(key: string): Promise<T | null>;

  /**
   * Salva um valor no cache.
   * @param key A chave do item no cache.
   * @param value O valor a ser salvo (será serializado).
   * @param ttl Opcional: Tempo de vida em segundos (Time-To-Live).
   */
  set<T>(key: string, value: T, ttl?: number): Promise<void>;

  /**
   * Deleta um valor do cache.
   * @param key A chave do item a ser removido.
   */
  del(key: string): Promise<void>;

  /**
   * Deleta todas as chaves que começam com um determinado prefixo.
   * @param prefix O prefixo das chaves a serem deletadas.
   */
  delByPrefix(prefix: string): Promise<void>;

  /**
   * Limpa todo o cache (cuidado ao usar em produção).
   */
  clearAll(): Promise<void>;
}
