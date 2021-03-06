import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSnackBar} from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'MaterialTest';
  notifications = 0;
  selectedValue: string;
  opened: boolean = false;
  
  constructor(private snackBar: MatSnackBar, private dialog: MatDialog){

  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  ngOnInit(): void {
    this.dataSource.sort = this.sort;  
    this.dataSource.paginator = this.paginator;
  }
  
  openDialog(){
    let dialogRef = this.dialog.open(DialogExampleComponent, {data: {name: "bibhu"}});
  
    dialogRef.afterClosed().subscribe(r => {
      console.log(`Dialog Result: ${r}`);
    }); 
  
  }


  
  openSnakBar(message, action){
    let snackBarRef = this.snackBar.open(message, action, {duration: 2000});

    snackBarRef.afterDismissed().subscribe(() => {
      console.log("The snackbar was dismissed.");
    });

    snackBarRef.onAction().subscribe(() => {
      console.log("The snackbar action was clicked.");
    });
  }

  log(message: string){
    console.log(message);
  }

  logRow(row){
    console.log(row);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
