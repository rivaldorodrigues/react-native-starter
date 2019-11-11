import Realm from 'realm';
import RealmUtil from './realm-util';
import Entidade from '../model/entidade';
import Usuario from 'src/model/usuario';

export default class Repositorio<T extends Entidade> {

    constructor(private realmUtil: RealmUtil, private schema: string) {}

    static openUsuario(): Promise<Repositorio<Usuario>> {
        return Repositorio.open(Usuario.schema.name);
    }

    /**
     * Abre a conexão com o banco de dados e recupera um `Repositorio` para o schema fornecido.
     *
     * @param schema o schema desejado
     * @returns {Promise<any> | Promise} o `Repositorio` ou a mensagem de falha caso não seja possível abrir a conexão com o banco
     */
    private static open<T extends Entidade>(schema: string): Promise<Repositorio<T>> {

        return new Promise((resolve, reject) => {

            const realmUtil = new RealmUtil();

            realmUtil.open()
                .then(sucesso => {
                    if (sucesso) {
                        resolve(new Repositorio<T>(realmUtil, schema));
                    } else {
                        console.error('Falha ao abrir o banco de dados para o schema:', schema);
                        reject(`Falha ao abrir o banco de dados para o schema: ${schema}`);
                    }
                })
                .catch(error => {
                    console.error('Falha ao abrir o banco de dados para o schema:', schema);
                    reject(error)
                });
        });
    }

    inserir(data: T): void {
        return this.realmUtil.inserir<T>(this.schema, data);
    }

    inserirTodos(data: T[]): void {
        return this.realmUtil.inserirTodos<T>(this.schema, data);
    }

    remover(data: T): void {
        return this.realmUtil.remover<T>(this.schema, data);
    }

    removerTodos(): void {
        return this.realmUtil.removerTodos(this.schema);
    }

    atualizar(funcaoAtualizar: Function): void {
        this.realmUtil.atualizarObjeto(funcaoAtualizar);
    }

    listar(): Realm.Results<T & Realm.Object> | null {
        return this.realmUtil.listar<T>(this.schema);
    }

    listarPor(filtro: string, ...valor: any[]): Realm.Results<T> | undefined {

        const lista = this.realmUtil.listar<T>(this.schema);

        if (lista && lista.length > 0) {
            return lista.filtered(filtro, valor);
        }
    }

    listarOrdenado(campo: string, descendente = false): Realm.Results<T> | undefined {

        const lista = this.realmUtil.listar<T>(this.schema);

        if (lista && lista.length > 0) {
            return lista.sorted(campo, descendente);
        }
    }

    findById(id: any): T | undefined {

        const lista = this.realmUtil.listar<T>(this.schema);

        if (lista && lista.length > 0) {

            const listaFiltrada = lista.filtered('id = $0', id);

            if (listaFiltrada && listaFiltrada.length > 0) {
                return listaFiltrada[0];
            }
        }
    }

    count() : number {
        return this.realmUtil.count<T>(this.schema);
    }

    getFirst(): T | undefined {

        const lista = this.realmUtil.listar<T>(this.schema);

        if (lista && lista.length > 0) {
            return lista[0];
        }
    }
}
