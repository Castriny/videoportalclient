import {Component, OnInit, ViewChild} from '@angular/core';
import {WebRtcService} from '../../WebRtcService';

declare let SimpleWebRTC: any;

@Component({
    selector: 'app-room',
    templateUrl: './app.room.component.html',
    providers: [WebRtcService]
})
export class AppRoomComponent implements OnInit {
    @ViewChild('videos') videobox: any;

    constructor(private webrtcService: WebRtcService) {
        this.webrtcService.init();

        webrtcService.onReadyToCall().subscribe(() => {


            this.webrtcService.getRTC().joinRoom('test');


            console.log('ready');


        });

        webrtcService.onVideoAdded().subscribe(data => {

            this.videobox.nativeElement.childNodes.forEach((node: any) => {
                console.log();
                node.controls = true;
                if (node.id.search('audio') === -1) {
                    node.style.display = 'none';
                }
            });


        });
    }

    ngOnInit(): void {

    }
}
