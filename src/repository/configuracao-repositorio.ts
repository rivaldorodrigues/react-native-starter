import RealmUtil from './realm-util';
import Configuracao from '../model/configuracao';

export default class ConfiguracaoRepositorio {

    constructor(private realmUtil: RealmUtil) {}

    /**
     * Abre a conexão com o banco de dados e recupera o `ConfiguracaoRepositorio`
     * para manipulação de dados.
     *
     * @returns {Promise<any> | Promise} o `ConfiguracaoRepositorio` ou a mensagem de falha caso não
     * seja possível abrir o banco de dados
     */
    static open(): Promise<ConfiguracaoRepositorio> {

        return new Promise((resolve, reject) => {

            const realmUtil = new RealmUtil();

            realmUtil.open()
                .then(sucesso => {
                    if (sucesso) {
                        resolve(new ConfiguracaoRepositorio(realmUtil));
                    } else {
                        console.log('Falha ao abrir o banco de dados de configurações');
                        reject(`Falha ao abrir o banco de dados de configurações`);
                    }
                })
                .catch(error => {
                    console.log('Falha ao abrir o banco de dados de configurações');
                    reject(error)
                });
        });
    }

    setConfiguracao(chave: string, valor: string): void {
        return this.realmUtil.inserir(Configuracao.schema.name, {chave, valor});
    }

    getConfiguracao(chave: string): string | undefined {

        const configuracao = this.getConfiguracaoObject(chave);

        if (configuracao) {
            return configuracao.valor;
        }
    }

    removerConfiguracao(chave: string): void {

        const configuracao = this.getConfiguracaoObject(chave);

        if (configuracao) {
            this.realmUtil.remover(Configuracao.schema.name, configuracao);
        }
    }

    private getConfiguracaoObject(chave: string): Configuracao | undefined {

        const lista = this.realmUtil.listar<Configuracao>(Configuracao.schema.name);

        if (lista && lista.length > 0) {

            const resposta = lista.find((row: Configuracao) => {
                return chave === row.chave;
            });

            return resposta;
        }
    }
}