import Entidade from "./entidade";

export default class Configuracao extends Entidade {

    constructor(readonly chave: string, readonly valor: string) {
        super();
    }
  
    static schema: Realm.ObjectSchema = {
      name: 'Configuracao',
      primaryKey: 'chave',
      properties: {
        chave: 'string',
        valor: 'string',
      },
    }
  }