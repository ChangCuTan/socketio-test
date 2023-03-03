import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { GolfResult } from '../model/golf-result';

@Injectable({
  providedIn: 'root'
})
export class GolfSocketIoService {

  socket: any;
  readonly socketUrl:string ="https://mst-full-stack-dev-test.herokuapp.com/";

  constructor() {
    this.socket=io(this.socketUrl);
   }

   getDataFromSocket(eventName:string){
    return new Observable((subscriber)=>{
      this.socket.on(eventName,(data: GolfResult)=>{
        subscriber.next(data);
      })
    })

   }
   disconnectSocket(){
    this.socket.disconnect()
  }

}