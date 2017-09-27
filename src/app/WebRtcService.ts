import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

declare let SimpleWebRTC: any;

@Injectable()
export class WebRtcService {

    webrtc: any;


    constructor() {
        this.webrtc = new SimpleWebRTC({
            url: 'http://localhost:8888',
            socketio: {},
            connection: null,
            debug: false,
            localVideoEl: 'local-video',
            remoteVideosEl: 'remote-video',
            autoRequestMedia: true,
            adjustPeerVolume: true,
            media: {
                video: true, audio: true
            }
        });
    }

    getRTC() {
        return this.webrtc;
    }


    onError() {
        return new Observable<any>(observer => {
            this.webrtc.on('error', error => {
                observer.next(error);
            });
        });
    }

    onSetUser() {
        return new Observable<any>(observer => {
            this.webrtc.connection.on('message', data => {
                console.log(data);
                if (data.type === 'setUser') {
                    observer.next(data.payload);
                }
            });
        });
    }

    onTextMessage() {
        return new Observable<any>(observer => {
            this.webrtc.connection.on('message', data => {
                if (data.type === 'text') {
                    observer.next(data.payload);
                }
            });
        });
    }

    onRoomReady() {
        return new Observable<any>(observer => {
            this.webrtc.connection.on('message', data => {
                if (data.type === 'roomReady') {
                    observer.next(data.payload);
                }
            });
        });
    }

    onConnectionReady() {
        return new Observable<any>(observer => {
            this.webrtc.on('connectionReady', sessionId => {
                observer.next(sessionId);

            });
        });
    }

    onReadyToCall() {
        return new Observable<any>(observer => {
            this.webrtc.on('readyToCall', () => {
                observer.next();

            });
        });
    }

    onVideoAdded() {
        return new Observable<any>(observer => {
            this.webrtc.on('videoAdded', (video, peer) => {
                observer.next({video: video, peer: peer});
            });
        });
    }

    onVideoRemoved() {
        return new Observable<any>(observer => {
            this.webrtc.on('videoRemoved', (video, peer) => {
                observer.next({video: video, peer: peer});
            });
        });
    }
}
