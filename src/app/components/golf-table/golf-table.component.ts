import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GolfResult } from 'src/app/model/golf-result';
import { GolfSocketIoService } from 'src/app/service/golf-socket-io.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-golf-table',
  templateUrl: './golf-table.component.html',
  styleUrls: ['./golf-table.component.css']
})
export class GolfTableComponent implements OnInit {


  displayedColumns = ['First', 'Last', 'MSTID', 'course', 'Sex', 'Match', 'Nationality', 'score', 'holesPlayed'];
  tableResult: GolfResult[] = [];

  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(
    private socketIo: GolfSocketIoService) {

  }
  ngOnInit(): void {
    this.socketIo.getDataFromSocket('data-update').subscribe((data: any) => {
      this.updateTable(data);
      const model: GolfResult = data;

      console.log(this.tableResult);

    });
  }


  ngOnDestroy() {
    this.socketIo.disconnectSocket();
    console.log("On destroy close connection");
  }

  updateTable(data: GolfResult) {
    if(this.tableResult.some(result => result.MSTID ===data .MSTID)){
      this.tableResult =this.tableResult.filter(record=>record.MSTID !=data .MSTID)
    }
    this.tableResult.unshift(data);//put on top first in the list
    this.dataSource = new MatTableDataSource<GolfResult>(this.tableResult);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.matSort;

  }

  
}
