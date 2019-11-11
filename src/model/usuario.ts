import Entidade from './entidade';

export default class Usuario extends Entidade {

    constructor(readonly id: number, readonly login: string, readonly senha: string, readonly email: string | null) {
        super();
    }

    public static fromRealm(realmObject: Usuario): Usuario {
        return new Usuario(realmObject.id, realmObject.login, realmObject.senha, realmObject.email);
    }

    static schema: Realm.ObjectSchema = {
        name: 'Usuario',
        primaryKey: 'id',
        properties: {
            id: 'int',
            login: 'string',
            senha: 'string',
            email: 'string?',
        }
    }
}
