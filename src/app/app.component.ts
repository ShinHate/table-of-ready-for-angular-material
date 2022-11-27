import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {GetService} from "./service/get.service";
import {MatTableDataSource} from "@angular/material/table";
import {IImages} from "./models/images";
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title: string = 'Lk';

  displayedColumns: string[] = ['id', 'name'];
  dataSource = new MatTableDataSource<IImages>;

  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 6, 9, 12];

  constructor(public getService: GetService) {}

  @ViewChild(MatPaginator) paginator:any = MatPaginator;

  ngOnInit(): void {
    this.getService.getAllImage().subscribe(() => {
      this.fillOfDataSource()
    }, (error) => {
      console.log(error)
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fillOfDataSource() {
    this.dataSource = new MatTableDataSource<IImages>(this.getService.images)
    this.dataSource.paginator = this.paginator;
  }

}
