const productos = [
  { id: 1, nombre: "SW Tee", imagen: "./assets/images/products/reme_1.webp", precio: 30000 },
  { id: 2, nombre: "Rock n' Wolf", imagen: "./assets/images/products/reme_2.webp", precio: 32000 },
  { id: 3, nombre: "Skully Beach", imagen: "./assets/images/products/reme_3.webp", precio: 32000 },
  { id: 4, nombre: "Punked", imagen: "./assets/images/products/reme_4.webp", precio: 36000 },
  { id: 5, nombre: "Serious Skully", imagen: "./assets/images/products/reme_5.webp", precio: 33000 },
  { id: 6, nombre: "Have Fun!", imagen: "./assets/images/products/reme_6.webp", precio: 32000 },
  { id: 7, nombre: "SW Tee II", imagen: "./assets/images/products/reme_7.webp", precio: 36000 },
  { id: 8, nombre: "Monument", imagen: "./assets/images/products/reme_8.webp", precio: 34000 },
];

let carrito = {};
const iva = 1.21;

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
});

function mostrarProductos() {
  const productosContainer = document.getElementById("productos");
  productosContainer.innerHTML = "";
  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("producto");
    card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
            <h4>${producto.nombre}</h4>
            <h6>$ ${producto.precio}</h6>
            <select class="talle">
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>
            <input type="number" class="cantidad" value="1" min="1">
            <button class="agregar" data-id="${producto.id}">Agregar</button>
        `;
    productosContainer.appendChild(card);
  });

  document.querySelectorAll(".agregar").forEach((boton) => {
    boton.addEventListener("click", (event) => {
      const id = parseInt(event.target.dataset.id);
      const card = event.target.parentElement;
      const talle = card.querySelector(".talle").value;
      const cantidad = parseInt(card.querySelector(".cantidad").value);
      agregarAlCarrito(id, talle, cantidad);
    });
  });
}

function agregarAlCarrito(id, talle, cantidad) {
  const producto = productos.find((p) => p.id === id);
  const key = `${producto.id}-${talle}`;
  if (carrito[key]) {
    carrito[key].cantidad += cantidad;
  } else {
    carrito[key] = { ...producto, talle, cantidad };
  }
  actualizarCarrito();
}

function actualizarCarrito() {
  const carritoContainer = document.getElementById("carrito");
  const totalElement = document.getElementById("total");
  carritoContainer.innerHTML = "";
  let total = 0;

  for (const key in carrito) {
    const item = carrito[key];
    total += item.precio * item.cantidad;
    const li = document.createElement("li");
    li.innerHTML = `${item.nombre} - ${item.talle} x${item.cantidad} 
            <button onclick="eliminarUno('${key}')">quitar 1</button>
            <button onclick="eliminarTodos('${key}')">Borrar</button>`;
    carritoContainer.appendChild(li);
  }
  totalElement.innerText = `Total con IVA: $${(total * iva).toFixed(2)}`;
}

function eliminarUno(key) {
  if (carrito[key].cantidad > 1) {
    carrito[key].cantidad--;
  } else {
    delete carrito[key];
  }
  actualizarCarrito();
}

function eliminarTodos(key) {
  delete carrito[key];
  actualizarCarrito();
}

document.getElementById("toggle-carrito").addEventListener("click", () => {
  const carritoContainer = document.getElementById("carrito-container");
  carritoContainer.style.display = carritoContainer.style.display === "none" ? "block" : "none";
});

document.getElementById("pagar").addEventListener("click", () => {
  alert(
    `Total a pagar con IVA: $${(
      Object.values(carrito).reduce((acc, item) => acc + item.precio * item.cantidad, 0) * iva
    ).toFixed(2)}`
  );
  carrito = {};
  actualizarCarrito();
});
