import {environment} from '../../environments/environment';

export class Config {

 //   public static httpBasePath = 'http://videoportal.local/api/';

    public static httpBasePath = 'https://api.myvisitplace.de/api/';

    public static notificationOptions: any = {
        position: ['top', 'right'],
        timeOut: 5000,
        lastOnBottom: true,
    };
}
