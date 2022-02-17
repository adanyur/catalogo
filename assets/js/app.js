$(document).ready(function () {
  listCategory();
  buttonAuth();
  countCarrito();
  countFavorite();
  session()
    ? localStorage.setItem("session", true)
    : localStorage.setItem("session", false);
  localStorage.setItem("sessionAdmin", false);
});

/***************LOGIN****************/

const login = () => {
  let user = document.getElementById("user").value;
  let password = document.getElementById("password").value;
  $.post("../model/Login.php", { user, password }, (value) => {
    const data = JSON.parse(value);
    localStorage.setItem("session", data.status);
    localStorage.setItem("user", value);
    countCarrito();
    buttonAuth();
    document.getElementById("modal-btn").checked = false;
  });
};

const id = () => (session() ? dataUser().id : null);
const user = () => (session() ? dataUser().email : null);
const dataUser = () => JSON.parse(localStorage.getItem("user"));
const session = () => JSON.parse(localStorage.getItem("session"));

const logout = () => {
  localStorage.clear();
  localStorage.setItem("session", false);
  buttonAuth();
  document.getElementById("countCarrito").innerHTML = 0;
};

const register = () => {
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let email = document.getElementById("email").value;
  let passwor = document.getElementById("passwor").value;
  let comment = document.getElementById("comment").value;
  let zip = document.getElementById("zip").value;
  let town = document.getElementById("town").value;
  let cell = document.getElementById("cell").value;

  const data = {
    firstname,
    lastname,
    email,
    passwor,
    comment,
    town,
    zip,
    cell,
  };
  let template = "";
  $.post("../model/user-register.php", data, (data) => {
    template = `
    <div class="container-form animate__animated animate__fadeIn">
      <div class="alert alert-success" role="alert">
            ${data}
      </div>
    </div>
    `;
    document.getElementById("register").style.display = "none";
    document.getElementById("message-auth").innerHTML = template;
    setTimeout(() => {
      document.getElementById("message-auth").style.display = "none";
      document.getElementById("login").style.display = "block";
    }, 2000);
  });
};

/************************CARRITTO*************************/

const AddCart = (idProduct, isFavorite = false) => {
  document.getElementById("viewDetail").style.display = "none";
  document.getElementById("templateDynamic").style.display = "block";
  if (!id()) {
    messageAuth();
    return;
  }

  let nameId = isFavorite
    ? `quantityFavorite${idProduct}`
    : `quantity${idProduct}`;

  let cantidad = document.getElementById(`${nameId}`).value;
  let idproducto = document.getElementById(`idproduct${idProduct}`).value;
  let usuario = id();
  let data = { idproducto, cantidad, usuario };
  $.post("../pages/cart-list.php", data, (data) => {
    countCarrito();
    Toast("Se agrego a su carrito");
  });
};

const cantidadValidacion = (idProduct) => {
  let cantidad = document.getElementById("quantity" + idProduct).value;
  let cantidadFiltro = document.getElementById("q" + idProduct).value || 1;
  return cantidad === cantidadFiltro
    ? cantidad
    : cantidad > cantidadFiltro
    ? cantidad
    : cantidad < cantidadFiltro
    ? cantidadFiltro
    : cantidad;
};

const countCarrito = () => {
  if (id()) {
    $.get(`../model/countCarrito.php?id=${id()}`, (data) => {
      let count = JSON.parse(data);
      count.forEach((count) => {
        document.getElementById("countCarrito").innerHTML = count.count || 0;
      });
    });
  }
  document.getElementById("countCarrito").innerHTML = 0;
};

/*********MODAL********/
const openModal = (type) => {
  document.getElementById("viewDetail").style.display = "none";
  document.getElementById("templateDynamic").style.display = "block";
  document.getElementById("modal-btn").checked = true;

  switch (type) {
    case "CART": {
      cartProductLisModal();
      break;
    }
    case "AUTH": {
      auth();
      break;
    }
    case "EMAIL": {
      email();
      break;
    }

    case "FAVORITE": {
      listFavorite();
      break;
    }
  }
};

const cartProductLisModal = () => {
  if (!id()) {
    messageAuth();
    return;
  }
  $.get(`../model/productListById-model.php?id=${id()}`, (value) => {
    let data = JSON.parse(value);
    let template = "";
    if (value === "null") {
      emptyCart({ image: "CARRITO", message: "No tiene nada en el carrito" });
      return;
    }
    template += `<div class="modal-head" id="modal-head">
                  <h1 class="modal-title text-center" id="title-modal">Carrito</h1>
                </div>  
                <div class="modal-body" id="modal-body">`;
    template += `<div id="listadoDeCarrito">
                  ${detalleDelCarrito(data)}
                </div>
                `;
    template += `<div id="formaDePago" style="display:none;width:100%">
                    ${formaDePago()}
                </div>
                `;
    template += `<div id="messageConfirmation" style="display:none;width:100%">
                  ${messageConfirmation()}
                </div>
                `;

    template += `</div>
                  <div class="modal-footer" id="modal-footer">
                    <button class="btn-add" onclick="showFormPago()">
                    <span id="subtotal" class="info-payment"></span>|
                      <span class="info-payment">
                        <img src="../assets/icon/hand.svg">
                      </span>
                    </button>
                  </div>
                `;

    document.getElementById("templateDynamic").innerHTML = template;
    calculoCart();
  });
};

const emptyCart = ({ image, message }) => {
  document.getElementById("modal-btn").checked = true;
  const IMAGEN_DYNAMIC = {
    FAVORITE: `<img src="../assets/icon/star-color.svg" class="imagen-icon-empty">`,
    CARRITO: `<img src="../assets/icon/empty-cart.svg" class="imagen-icon-empty">`,
  };

  let template = `
    <div class="modal-body">
      <div class="container-message">
          ${IMAGEN_DYNAMIC[image]}
          <h4>${message}</h4>
      </div>
    </div>
    `;
  document.getElementById("templateDynamic").innerHTML = template;
};

const messageAuth = () => {
  document.getElementById("viewDetail").style.display = "none";
  document.getElementById("modal-btn").checked = true;

  let template = `
  <div class="modal-body">
    <div class="container-message">
        <img src="../assets/icon/user-color.svg">
        <h4>Debe iniciar session</h4>
    </div>
  </div>
  `;
  document.getElementById("templateDynamic").innerHTML = template;
};

const detalleDelCarrito = (value) => {
  return value.map((data) => {
    return `<div class="card mb-2 card-shadow card-shadow-2">
          <div class="card-body card-padding">
            <div class="container-order">
                <div class="container-img">
                    <img src="${data.image}" class="img-product">
                </div>
                <div class="container-order-detall">
                <div class="detalle-head">
                  <span class="info-detalle">${data.name}</span>
                  <img src="../assets/icon/delete.svg" class="img-svg" onclick="deleteCart(${data.id})">
                </div>
                <div class="detalle-body">
                  <div class="detalle-item">
                    <span class="head-info">Cantidad</span>
                    <span class="body-info">${data.quantity}</span>
                  </div>
                  <div class="detalle-item border-separador">
                  <span class="head-info">Precio</span>
                    <span class="body-info">${data.price}</span>
                  </div>
                  <div class="detalle-item">
                  <span class="head-info">Total</span>
                    <span class="body-info">${data.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      `;
  });
};

const formaDePago = () => {
  const json = [
    { icon: "../assets/icon/paypal.svg", forma: "Paypal" },
    { icon: "../assets/icon/store.svg", forma: "Tienda" },
  ];
  return json.map((value) => {
    return `<div class="card mb-2 card-shadow card-shadow-2 w-100" onclick="setForma('${value.forma}')">
              <div class="card-body card-padding">
                <div class="container-order">
                  <div class="container-icon">
                    <img src="${value.icon}" class="img-svg-forma-pago">
                  </div>
                  <div class="container-order-detall">
                      <h1>${value.forma}</h1>
                  </div>
                </div>
              </div>
            </div>`;
  });
};

const messageConfirmation = () => {
  if (id()) {
    const { nombre } = dataUser();
    return `<div class="container-message">
              <div class="container-icon-message">
                <img src="../assets/icon/check.svg" class="img-svg-message">
              </div>
              <div class="container-text-message">
                  ${nombre}, se genero su orden!!
              </div>
            </div>
          `;
  }
};

const setForma = (pago) => {
  let idusuario = id();
  const data = { idusuario, pago };
  showConfirmation();
  // $.post(`../model/order.php`, data, (data) => {

  // });
};

const imagenesProduct = (imagenes, id) => {
  let template = "";
  template += `<div  class="d-flex flex-column align-items-center scrollspy-example">`;
  imagenes.forEach(({ imagen }) => {
    template += `<img src="${imagen}" alt="${imagen}" class="img-thumbnail h-50" onclick="seleccionImagen(${id},'${imagen}')">`;
  });
  template += `</div>`;
  return template;
};

const seleccionImagen = (id, imagen) => {
  document.getElementById(`imagen${id}`).src = imagen;
};

const viewDetail = (idproduct) => {
  let template = "";
  document.getElementById("templateDynamic").style.display = "none";
  document.getElementById("viewDetail").style.display = "block";
  document.getElementById("modal-btn").checked = true;
  $.get(`../model/productById-model.php?id=${idproduct}`, (data) => {
    const { id, name, image, detail1, imagenes } = JSON.parse(data);
    template += `
          <div class="container-view-detail">
                <div class="header-view-detail">
                    <span class="view-detail-title">${name}</span>
                </div>
                <div class="body-view-detail">
                      <div class="body-view-detail-img">
                        ${imagenesProduct(imagenes, id)}
                        <img src="${image}" class="view-detail-img" id="imagen${id}">
                      </div>
                      <div class="body-view-detail-detail">
                        <span class="detail-title">Description</span>
                        <span class="detail-text">${detail1}</span>
                      </div>
                </div>
                <div class="footer-view-detail">
                  <img src="../assets/icon/whatsapp.svg">
                </div>
          </div>
      `;

    document.getElementById("viewDetail").innerHTML = template;
  });
};

const auth = () => {
  const template = `
    <div class="container-nav">
      <ul class="nav">
        <li class="nav-item" onclick="showAuthLogin()">Login</li>
        <li class="nav-item" onclick="showAuthRegister()">Register</li>
      </ul>
    </div>
    ${templateDynamic()}
    <div id="message-auth"></div>
    `;
  document.getElementById("templateDynamic").innerHTML = template;
};

const email = () => {
  let template = `
<div class="container-form animate__animated animate__fadeIn">
  <form autocomplete="off">
      <h1 class="form-title">Contactenos</h1>
      <div class="group-form">
          <input type="text" id="email" class="form-input" placeholder=" ">
          <label class="label-control">Email</label>
      </div>
      <div class="group-form group-textarea">
        <textarea class="form-input" placeholder=" " rows="5" cols="10" id="comentario"></textarea>
        <label class="label-control">Comentario</label>
      </div>
      <div class="group-form">
          <button type="button" onclick="senEmail()" class="btn-login">Enviar</button>
      </div>
  </form>
</div>
`;
  document.getElementById("templateDynamic").innerHTML = template;
};

const senEmail = () => {
  let email = document.getElementById("email").value;
  let comentario = document.getElementById("comentario").value;

  const params = { email, comentario };

  $.post("../model/mail.php", params, (value) => {
    Toast("Se envio el correo");
  });
};

const calculoCart = () => {
  $.post(`../model/calculo.php?id=${id()}`, (data) => {
    let value = JSON.parse(data);
    value.map((data) => {
      document.getElementById("subtotal").innerHTML = `$${
        data.subtotal || 0.0
      }`;
    });
  });
};

const deleteCart = (id) => {
  $.post("../model/deleteCart.php", { id }, (data) => {
    countCarrito();
    calculoCart();
    cartProductLisModal();
    Toast("Se elimino del carrito");
  });
};

const listCategory = () => {
  $.get("../model/category-list.php", (data) => {
    let template = "";
    let category = JSON.parse(data);
    template += '<div class="item"></div>';
    category.forEach((data) => {
      template += `
        <div class="item" onclick="SearchCategoryProduct(${data.id})">
            <img src="${data.image}" class="image-category animate__animated animate__fadeIn">
        </div>
      `;
    });
    document.getElementById("listCategory").innerHTML = template;
  });
};

const SearchCategoryProduct = (idcart) => {
  $.get(`../model/categoryListByid-model.php?id=${idcart}`, (data) => {
    let template = "";
    let categoryId = JSON.parse(data);
    template += `<div class="container-content animate__animated animate__fadeIn">`;
    categoryId.forEach((data) => {
      template += `
      <div class="card mb-4 card-shadow card-width ">
      <img class="card-img-top img-border-radius" src="${data.image}" alt="Card image cap">
      <div class="card-body">
          <div class="card-info">
             <div class="info-title">
                ${data.name}
             </div>
             <div class="info-price-quanty">
                <div class="info-price">
                   $${data.price}
                </div>
                <div class="info-quanty">
                   <input type="number" id="quantity${data.id}" name="quantity"  value=1 class="input-control">
                </div>
          </div>
         <input type="hidden" id="idproduct${data.id}" name="id" value="${data.id}">
          </div>
          <div class="container-button">
            <button  type="button" id="product${data.id}" onclick="AddCart(${data.id})" class="btn-add button-add-product">
            <img src="../assets/icon/add-to-cart.svg" class="img-icon">
            </button>
            <button  type="button" id="product${data.id}" onclick="viewDetail(${data.id})" class="btn-add btn-secondary-product">
            <img src="../assets/icon/loupe.svg" class="img-icon">
            </button>
          </div>
      </div>
    </div>
    `;
    });
    template += `</div>`;
    document.getElementById("listAll").style.display = "none";
    document.getElementById("searchCategoryProduct").innerHTML = template;
  });
};

const perfil = () => {
  return `
  <div class="dropdown animate__animated animate__fadeIn">
  <span><img src="../assets/icon/user_2.svg"></span>
  <div class="dropdown-content">
    <div class="dropdown-content-item">
      ${user()}
    </div>
    <div class="dropdown-content-item">
      perfil
    </div>
    <div class="dropdown-content-item animate__animated animate__fadeIn" onclick="logout()">
      <img src="../assets/icon/logout.svg" class="animate__animated animate__fadeIn">
      cerrra session
    </div>
  </div>
  </div>
`;
};

const buttonLogin = () => {
  return `
    <button type="button" class="btn btn-black animate__animated animate__fadeIn" onclick="openModal('AUTH')">
        <img src="../assets/icon/login.svg">
    </button>    
    `;
};

const buttoAddCart = (auth) => {
  const data = JSON.parse(auth);
  let buttonAddCart = !auth
    ? ``
    : `onclick="AddCart(<?=$product_array[$key]['id'];?>)"`;
  template = `
  <button  type="button" id="product<?=$product_array[$key]['id'];?>" ${buttonAddCart} class="btn-add button-add-product">
      <img src="../assets/icon/add-to-cart.svg" class="img-icon">
  </button>
  `;
  document.getElementById(`buttonAddCart${data.id}`).innerHTML = template;
};

const buttonAuth = () => {
  template = session() ? perfil() : buttonLogin();
  document.getElementById("auth").innerHTML = template;
};

/*********************FAVORITE************************/
const countFavorite = () => {
  $.get(`../model/favorite.php?id=${id()}`, (value) => {
    const data = JSON.parse(value);
    document.getElementById("countFavorito").innerHTML = 0;
  });
};

const listFavorite = () => {
  if (!id()) {
    messageAuth();
    return;
  }
  $.get(`../model/favorite.php?id=${id()}`, (value) => {
    let template = "";
    if (value === "null") {
      emptyCart({ image: "FAVORITE", message: "No tiene favoritos" });
      return;
    }

    template += `<div class="modal-head" id="modal-head">
                  <h1 class="modal-title text-center" id="title-modal">Favoritos</h1>
                </div>  
                <div class="modal-body" id="modal-body">
                ${templateFavorite(JSON.parse(value))}
          `;

    template += `</div>`;
    document.getElementById("templateDynamic").innerHTML = template;
  });
};

const templateFavorite = (data) => {
  return data.map((value) => {
    return `
    <div class="card mb-2 card-shadow card-shadow-2">
    <div class="card-body card-padding">
      <div class="container-order">
          <div class="container-img">
              <img src="${value.imagenProducto}" class="img-product">
          </div>
          <div class="container-order-detall">
          <div class="detalle-head">
            <span class="info-detalle">${value.descripcionProducto}</span>
            <img src="../assets/icon/delete.svg" class="img-svg" onclick="deleteFavorite(${value.idFavorite})">
          </div>
          <div class="detalle-body">
            <div class="detalle-item">
              <span class="head-info">Cantidad</span>
              <span class="body-info">
              <input type="number"  name="quantity${value.idProducto}"  
              value=1 
              class="input-control quantity${value.idProducto}"
              id="quantityFavorite${value.idProducto}"
              style="margin:0;padding:0">
              </span>
              <input type="hidden" id="idproduct${value.idProducto}" name="id" value="${value.idProducto}">
            </div>
            <div class="detalle-item border-separador">
            <span class="head-info">Precio</span>
              <span class="body-info">${value.precioProducto}</span>
            </div>
            <div class="detalle-item">
            <span class="head-info">&nbsp;</span>
              <span class="body-info w-100">
                <button  type="button" 
                  id="product${value.idProducto}"
                  onclick="AddCart(${value.idProducto},true)"
                  class="btn-add button-add-product">
                  <img src="../assets/icon/add-to-cart.svg" class="img-icon" width="20px" heigth="20px">
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
   `;
  });
};

const favorite = (codigoProducto, isCheck) => {
  if (!id()) {
    messageAuth();
    iconFavorite({ codigoProducto, isCheck: false });
    return;
  }
  iconFavorite({ codigoProducto, isCheck });

  const methods = isCheck ? "POST" : "DELETE";
  const params = { codigoProducto, methods, idUser: id() };
  $.post(`../model/favorite.php`, params, (value) => {
    Toast("Se agrego a sus favoritos");
  });
};

const iconFavorite = (data) => {
  const IMAGEN_DYNAMIC = {
    true: `<img src="../assets/icon/star-color.svg" class="image-icon-favorite-success" >`,
    false: `<img src="../assets/icon/star.svg" class="image-icon-favorite-success">`,
  };

  document.getElementById(
    `image-favorite-default${data.codigoProducto}`
  ).style.display = "none";

  document.getElementById(
    `image-favorite-chance${data.codigoProducto}`
  ).innerHTML = IMAGEN_DYNAMIC[data.isCheck];
};

const deleteFavorite = (id) => {
  const params = { id, methods: "DELETE" };
  $.post(`../model/favorite.php`, params, (value) => {
    Toast("Se elimino de tus favoritos");
    listFavorite();
  });
};

/***********************MENSAJES*******************/

const Toast = (text) => {
  let message = document.getElementById("snackbar");
  message.innerText = text;
  message.className = "show show-success";
  setTimeout(() => {
    message.className = message.className.replace("show", "");
  }, 3000);
};
