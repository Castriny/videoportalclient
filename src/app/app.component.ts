import {Component, OnInit, ViewChild} from '@angular/core';
import {WebRtcService} from './WebRtcService';
import {Config} from './Config/Config';

declare let SimpleWebRTC: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: []
})
export class AppComponent implements OnInit {
    public title = 'app';
    @ViewChild('videos') videobox: any;

    videosArray: Array<any> = [];
    textbox;
    notificationOptions = Config.notificationOptions;
    ngOnInit(): void {

    }
    /**
    public test() {
        this.webrtcService.getRTC().sendToAll('setUser', {username: 'Test'});

    }

    constructor(private webrtcService: WebRtcService) {


        webrtcService.onConnectionReady().subscribe(id => {


            this.webrtcService.getRTC().sendToAll('setUser', {id: id, username: 'Test'});
            this.webrtcService.getRTC().joinRoom('mainChannel');

        });
        webrtcService.onError().subscribe(error => {
            console.warn(error);
        });
        webrtcService.onTextMessage().subscribe(text => {
            console.log(text);
        });
        webrtcService.onSetUser().subscribe(user => {
            console.log(user);
        });

        webrtcService.onRoomReady().subscribe(state => {
            console.log('state', state);
        });

        webrtcService.onReadyToCall().subscribe(() => {


            this.webrtcService.getRTC().joinRoom('test');


            console.log('ready');

            this.webrtcService.getRTC().sendToAll('setUser', {username: 'Test'});


        });

        webrtcService.onVideoAdded().subscribe(data => {

            this.videobox.nativeElement.childNodes.forEach((node: any) => {


                if (node.id.search('audio') === -1) {
                    node.style.display = 'none';
                }
            });

            this.videosArray.push(data.peer.id);
        });

    }
 **/
}
