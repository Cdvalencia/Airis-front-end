import { Component, OnInit, Inject } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
// import { AprobadoresService } from '../../../../app/services/aprobadores/aprobadores.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewRolComponent } from '../new-rol.component';



@Component({
  selector: 'vex-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.scss']
})
export class modulosComponent implements OnInit {

  optionsShow = false;
  CompleteSolicitudes = [];
  allSolicitudes = [];
  solicitudes = [];
  page = 1;  
  user:any={};
  pages = [
    {
      amount: 2,
      text: "2 por Página"
    },
    {
      amount: 5,
      text: "5 por Página"
    },
    {
      amount: 10,
      text: "10 por Página"
    },
    {
      amount: 20,
      text: "20 por Página"
    },
    {
      amount: 50,
      text: "50 por Página"
    },
    {
      amount: 100,
      text: "100 por Página"
    },
  ];
  amount = 10;
  searchText = "";
  title = "";
  medicalFlow=false;
  currentSolicitud=[];
  uid="";
  uidFirebase ="";
  constructor(
    public dialogRef: MatDialogRef<NewRolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewRolComponent, 
    private router: Router,
    private route: ActivatedRoute,
    // private aprobadoresService: AprobadoresService

  ) { }

  ngOnInit(): void {    
    
  }

  init() {    
    console.log(this.data); 
  }

  close() {
    this.dialogRef.close(null);
  }
  
}
