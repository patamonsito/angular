# Validar submit

[disabled]="!formControl.valid"

# Muestrame el error si fue tocado

<div *ngIf="!tipo?.valid && tipo?.touched">
    <span *ngIf="tipo?.errors?.required" class="text-invalid">El Tipo de cuenta es obligatorio.</span>
    <span *ngIf="tipo?.errors?.minlength" class="text-invalid">Minimo debe contener X caracteres.</span>
</div>

# Obtener dato

  get rut() {
    return this.formDestinatario.get('rut');
  }

# Construccion del formulario

    this.formDestinatario = new FormGroup({
        rut: new FormControl('', [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(12),
          Validador.validarRUT
        ])
      })

# 