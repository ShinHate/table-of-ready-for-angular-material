import {Component, OnInit, ViewChild} from '@angular/core';
import {GetService} from "./service/get.service";
import {MatTableDataSource} from "@angular/material/table";
import {IImages} from "./models/images";
import {MatPaginator} from '@angular/material/paginator';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {PostService} from "./service/post.service";
import {DeleteService} from "./service/delete.service";

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
  tableSize: number = 4;
  tableSizes: any = [4, 8, 12, 16];

  form: FormGroup;
  files: any;

  // checked
  allComplete: boolean = false;

  constructor(
    public getService: GetService,
    public formBuilder: FormBuilder,
    public postService: PostService,
    public deleteService: DeleteService
  ) {
    this.form = new FormGroup({
      image: new FormControl(),
    })
  }

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  ngOnInit(): void {
    this.getService.getAllImage().subscribe(() => {
      this.fillOfDataSource()
    }, (error) => {
      console.log(error)
    });
  }


  someComplete(): boolean {
    if (this.getService.images == null) {
      return false;
    }
    return this.getService.images.filter(t => t.published).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    if (!this.getService.images.length){
      return;
    }
    this.allComplete = completed;
    if (this.getService.images == null) {
      return;
    }
    this.getService.images.forEach(t => (t.published = completed));
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

  uploadFile(event: any) {
    this.files = (event.target as HTMLInputElement).files
    this.form.patchValue({
      image: this.files
    });
  }

  submitForm(event: any) {
    for (let i = 0; i < this.form.get('image')?.value.length; i++) {
      this.postService.createImage(this.form.get('image')?.value[i])
    }
    event.srcElement[0].value = ''
  }
}
