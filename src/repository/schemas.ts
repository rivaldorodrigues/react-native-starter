import Configuracao from "src/model/configuracao";

export const schemas: Realm.Configuration[] = [{
    schema: [Configuracao.schema],
    schemaVersion: 1,
}];

// Migração de schemas do banco de dados
let nextSchemaIndex = Realm.schemaVersion(Realm.defaultPath);

while (nextSchemaIndex < schemas.length) {
    const migratedRealm = new Realm({ ...schemas[nextSchemaIndex] });
    nextSchemaIndex += 1;
    migratedRealm.close();
}