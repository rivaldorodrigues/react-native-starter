import Realm from 'realm';
import { schemas } from './schemas';
import Entidade from '../model/entidade';

export default class RealmUtil {

    private realm: Realm | null;

    constructor() {
        this.realm = null;
    }

    async open() {
        try {
            this.realm = await Realm.open(schemas[schemas.length - 1]);
            return true;
        } catch (error) {
            console.error('Falha ao abrir o banco de dados', error);
            this.realm = null;
            return error;
        }
    }

    /**
     * Insere um determinado objeto no banco de dados.
     *
     * @param schema o schema onde o dado será inserido
     * @param objeto o dado a ser inserido
     */
    inserir<T extends Entidade>(schema: string, objeto: T): void {
        if (this.realm != null) {
            this.realm.write(() => {
                this.realm!.create<T>(schema, objeto, true);
            });
        }
    }

    /**
     * Insere um determinado conjunto de objetos no banco de dados.
     *
     * @param schema o schema onde o dado será inserido
     * @param lista de objetos a ser inserido
     */
    inserirTodos<T extends Entidade>(schema: string, lista: T[]): void {
        if (this.realm != null) {
            this.realm.write(() => {
                lista.forEach(elemento => this.realm!.create<T>(schema, elemento, true));
            });
        }
    }

    /**
     * Lista os objetos armazenados em um determinado schema.
     *
     * @param schema o schema em questão
     * @returns {Realm.Results<any> | *} a lista de objetos caso exista
     */
    listar<T>(schema: string): Realm.Results<T & Realm.Object> | null {

        if (this.realm != null) {
            return this.realm.objects<T>(schema);
        }

        return null;
    }

    /**
     * Retorna a quantidade de objetos existentes em um determinado schema.
     * @param schema o schema em questão
     * @returns a quantidade de elementos
     */
    count<T>(schema: string): number {

        if (this.realm != null) {
            return this.realm.objects<T>(schema).length;
        }

        return 0;
    }

    /**
     * Remove um determinado objeto do banco de dados.
     *
     * @param schema o schema onde o dado será removido
     * @param objeto o dado a ser removido
     */
    remover<T extends Entidade>(schema: string, objeto: T): void {
        if (this.realm != null && objeto) {
            this.realm.write(() => {
                const dado = this.realm!.create<T>(schema, objeto, true);
                this.realm!.delete(dado);
            });
        }
    }

    /**
     * Remove todos os objetos do banco de dados para o schema em questão
     * @param schema o schema onde o dados serão removido
     */
    removerTodos(schema: string): void {
        if (this.realm != null) {
            this.realm.write(() => {
                const dados = this.realm!.objects(schema);
                this.realm!.delete(dados);
            });
        }
    }

    /**
     * Abre uma transação do Realm e envia a instância para a função de callback
     * para que seja possível realizar operações nos objetos do banco de dados
     *
     * @param funcaoAtualizar
     */
    atualizarObjeto(funcaoAtualizar: Function): void {
        if (this.realm != null) {
            this.realm.write(() => {
                funcaoAtualizar(this.realm!);
            });
        }
    }
}
