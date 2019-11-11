import { DateTime } from 'luxon';

export enum FORMATO {
  DATA_HORA_PADRAO = 'dd/MM/yyyy HH:mm',
  DATA_HORA_ZONA_URL = 'YYYY-MM-DDTHH:mm:ssZ',
  DATA_HORA_ZONA_URL_2 = 'yyyy-MM-ddTHH:mm:ss',
  DATA_HORA_ZONA_URL_3 = 'yyyy-MM-ddTHH:mm:ss.S',
  DATA_HORA_URL = 'YYYY-MM-DD HH:mm:ssZ',
  DATA_HORA_REALM = 'yyyy-MM-dd@HH:mm:ss',
  DATA_URL = 'yyyy-MM-dd',
  DATA_PADRAO = 'dd/MM/yyyy',
  HORA_PADRAO = 'HH:mm'
}

export class DataUtil {

  static dataHoraToDateTime(data: DateTime | string | Date | number, hora: string): DateTime {
    const dataString = DataUtil.toString(data, FORMATO.DATA_PADRAO);
    return DataUtil.toDateTime(`${data} ${hora}`);
  }

  static toDateTime(data: string | Date | number): DateTime {

    let dateTime: DateTime;

    if (data instanceof Date) {
      dateTime = DateTime.fromJSDate(data);
    } else if (typeof data === 'number') {
      dateTime = DateTime.fromMillis(data);
    } else {

      for (let formato in FORMATO) {

        dateTime = DateTime.fromFormat(data, FORMATO[formato]);

        if (dateTime && dateTime.isValid) {
          break;
        }
      }

      if (!dateTime || !dateTime.isValid) {
        console.error(`Formato inválido. ${data}`);
        throw new Error(`Formato inválido. ${data}`);
      }
    }

    return dateTime;
  }

  static toJSDate(data: DateTime | string | Date | number): Date {

    let dateTime: DateTime;

    if (data instanceof DateTime) {
      dateTime = data;
    } else {
      dateTime = DataUtil.toDateTime(data);
    }

    return dateTime.toJSDate();
  }

  static toString(data: DateTime | string | Date | number, formato = FORMATO.DATA_HORA_PADRAO): string {

    let dateTime: DateTime;

    if (data instanceof DateTime) {
      dateTime = data;
    } else {
      dateTime = DataUtil.toDateTime(data);
    }

    return dateTime.toFormat(formato);
  }

  static fromISO(data: string): DateTime | undefined {
    const dateTime = DateTime.fromISO(data);
    return (dateTime.isValid) ? dateTime : undefined;
  }

  static toISO(data: DateTime | string | Date | number): string {

    let dateTime: DateTime;

    if (data instanceof DateTime) {
      dateTime = data;
    } else {
      dateTime = DataUtil.toDateTime(data);
    }

    return dateTime.toISO();
  }

  static toRealm(data: DateTime | string | Date | number): String {
    return DataUtil.toString(data, FORMATO.DATA_HORA_REALM);
  }

}
