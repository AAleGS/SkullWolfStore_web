const iva = 1.21;
let Fem_M = 30000;
let Fem_L = 32000;
let Mas_M = 32000;
let Mas_L = 36000;
let totalCompra = 0;
let continuarMain = true;

const PrecioConIva = (precioProducto) => {
  return precioProducto * iva;
};

function mainSelect() {
  do {
    let accionUsuario = prompt(`Por favor elija una opcion para continuar: 
    1 - Comprar
    2 - Pagar
    3 - Salir`);

    switch (accionUsuario) {
      case "1":
        ChoseModel();
        break;
      case "2":
        let confirmarComprar = confirm(
          `Total a pagar con IVA: $${PrecioConIva(totalCompra).toFixed(2)}`
        );
        if ((confirmarComprar = true)) {
          alert("Gracias por su compra!");
          totalCompra = 0;
        } else {
          totalCompra = totalCompra;
        }
        break;
      case "3":
        alert("Gracias por visitarnos");
        continuarMain = false;
        break;
      default:
        alert("Opcion no disponible");
        break;
    }
  } while (continuarMain);
}

function ChoseModel() {
  let continuarCompra = true;
  do {
    let elegirmodelo = prompt(`Elija modelo de preferencia: 
    1 - SkullWolf 01
    2 - SkullWolf 02
    3 - Regresar`);

    switch (elegirmodelo) {
      case "1":
        alert("modelo elegido: SkullWolf 01");
        ChoseDetails();
        break;
      case "2":
        alert("modelo elegido: SkullWolf 02");
        ChoseDetails();
        break;
      case "3":
        continuarCompra = false;
        break;
      default:
        alert(`Opcion no disponible, 
          vuelva a intentarlo`);
        break;
    }
  } while (continuarCompra);
}

function ChoseDetails() {
  let continuarDetalle = true;
  do {
    let elegirmodelo = prompt(`Elija genero y talle: 
    1 - Femenino M
    2 - Femenino L
    3 - Masculino M
    4 - Masculino L
    5 - Regresar`);

    switch (elegirmodelo) {
      case "1":
        alert("Agregado: Femenino M");
        totalCompra += Fem_M;
        break;
      case "2":
        alert("Agregado: Femenino L");
        totalCompra += Fem_L;
        break;
      case "3":
        alert("Agregado: Masculino M");
        totalCompra += Mas_M;
        break;
      case "4":
        alert("Agregado: Masculino L");
        totalCompra += Mas_L;
        break;
      case "5":
        continuarDetalle = false;
        break;
      default:
        alert("Opcion no disponible");
        break;
    }
  } while (continuarDetalle);
}

alert(`SKuLLWOlf 
  Bienvenido al store`);

mainSelect();

console.log(`Total de la compra sin IVA: $${totalCompra}`);
console.log(
  `Total de la compra con IVA: $${PrecioConIva(totalCompra).toFixed(2)}`
);
