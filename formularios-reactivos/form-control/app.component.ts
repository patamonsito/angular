import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ClienteService } from '@shared/services/cliente.service';
import { destinatarioInterface } from '@core/models/destinatario.model';
import { Validador } from '../../../../shared/utils/validators';

@Component({
  selector: 'app-transferir-page',
  templateUrl: './transferir-page.component.html',
  styleUrls: ['./transferir-page.component.css']
})
export class TransferirPageComponent implements OnInit, OnDestroy {

  token: string = this.cookie.get('token') || '';

  formDestinatario: FormGroup = new FormGroup({});

  destinatario: destinatarioInterface;

  saveDestinatarios: destinatarioInterface[] = [];

  formTransaccion: FormGroup = new FormGroup({});

  destinatarioSeleccionado: destinatarioInterface;


  constructor(private clienteService: ClienteService, private cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
    
    this.formDestinatario = new FormGroup({
        rut: new FormControl('', [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(12),
          Validador.validarRUT
        ])
      })
  }

  verificarRut(){
    const rutDestinatario = this.formDestinatario.value.rut;

    if(this.rut?.status != "INVALID" && rutDestinatario.length == 12){
      const formatRut = rutDestinatario.replaceAll('-', '').replaceAll('.', '').slice(0, -1) + '-' + rutDestinatario.slice(-1);

      if(Number(formatRut.slice(0,2)) > 49){
        this.isPersona = false;
      }
    }else{
      this.isPersona = true;
    }

  }


  sendTransaccion(): void{
    let datos = {
      rut: this.destinatarioSeleccionado.rut,
    }

    this.clienteService.realizarTransferencia(datos)
      .subscribe(respuesta => {
        this.router.navigate(['/', 'cartola'])
      },
    err => {
      console.log(err);
    })
  }

  
  get rut() {
    return this.formDestinatario.get('rut');
  }

  ngOnDestroy(): void {

  }

}