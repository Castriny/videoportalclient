import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

declare let SimpleWebRTC: any;

@Injectable()
export class WebRtcService {

    webrtc: any;


    constructor() {

    }

    public init() {
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

    public getRTC() {
        return this.webrtc;
    }


    public onError() {
        return new Observable<any>(observer => {
            this.webrtc.on('error', error => {
                observer.next(error);
            });
        });
    }

    public onSetUser() {
        return new Observable<any>(observer => {
            this.webrtc.connection.on('message', data => {
                console.log(data);
                if (data.type === 'setUser') {
                    observer.next(data.payload);
                }
            });
        });
    }

    public onTextMessage() {
        return new Observable<any>(observer => {
            this.webrtc.connection.on('message', data => {
                if (data.type === 'text') {
                    observer.next(data.payload);
                }
            });
        });
    }

    public onRoomReady() {
        return new Observable<any>(observer => {
            this.webrtc.connection.on('message', data => {
                if (data.type === 'roomReady') {
                    observer.next(data.payload);
                }
            });
        });
    }

    public onConnectionReady() {
        return new Observable<any>(observer => {
            this.webrtc.on('connectionReady', sessionId => {
                observer.next(sessionId);

            });
        });
    }

    public onReadyToCall() {
        return new Observable<any>(observer => {
            this.webrtc.on('readyToCall', () => {
                observer.next();

            });
        });
    }

    public onVideoAdded() {
        return new Observable<any>(observer => {
            this.webrtc.on('videoAdded', (video, peer) => {
                observer.next({video: video, peer: peer});
            });
        });
    }

    public onVideoRemoved() {
        return new Observable<any>(observer => {
            this.webrtc.on('videoRemoved', (video, peer) => {
                observer.next({video: video, peer: peer});
            });
        });
    }
}
