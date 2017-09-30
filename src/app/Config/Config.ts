import {environment} from '../../environments/environment';

export class Config {

    public static httpBasePath = environment.api


    public static notificationOptions: any = {
        position: ['top', 'right'],
        timeOut: 5000,
        lastOnBottom: true,
    };
}
