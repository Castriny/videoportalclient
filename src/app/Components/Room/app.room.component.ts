import {Component, OnInit, ViewChild} from '@angular/core';
import {WebRtcService} from '../../WebRtcService';

declare let SimpleWebRTC: any;

@Component({
    selector: 'app-room',
    templateUrl: './app.room.component.html',
    providers: [WebRtcService]
})
export class AppRoomComponent implements OnInit {
    constructor(private webrtcService: WebRtcService) {

    }

    ngOnInit(): void {
    }

}