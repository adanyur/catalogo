const getProductAll = () => {
  $.get("views/producto.php", (data) => {
    let producto = JSON.parse(data);
    let template = "";

    producto.map((value) => {
      template += `
          <div class="container-table">
              <div class="container-table-header">
                  <img src="${value.image}" class="imagen-list">
              </div>
              <div class="container-table-body">
                  <div class="container-row-header">
                      <div class="cell-item">Nombre</div>
                      <div class="cell-item">Categoria</div>
                      <div class="cell-item">Precio</div>
                  </div>  
                  <div class="container-row-body">
                    <div class="cell-item">${value.nameproducto}</div>
                    <div class="cell-item">${value.namecategory}</div>
                    <div class="cell-item">${value.price}</div>
                  </div>
              </div>
              <div class="container-table-footer">
                <img src="../assets/icon/edit.svg" class="img-svg-2" onclick="AgregarEditar('producto','PUT',${value.id})">
                <img src="../assets/icon/delete.svg" class="img-svg-2" onclick="deleteProducto(${value.id})">
              </div>        
          </div>
    `;
      document.getElementById("listProduct").innerHTML = template;
    });
  });
};

const getCategoryAll = (isList = true) => {
  $.get("views/categoria.php", (data) => {
    let categoria = JSON.parse(data);
    if (isList) getCategoriaList(categoria);
    if (!isList) getCategoriaSelect(categoria);
  });
};

const getCategoriaSelect = (data) => {
  let templateOption = "";
  data.map((value) => {
    templateOption += `<option value="${value.id}">${value.name}</option>`;
    if (document.getElementById("optionCategoria"))
      document.getElementById("optionCategoria").innerHTML = templateOption;
  });
};

const getCategoriaList = (data) => {
  let template = "";
  data.map((value) => {
    template += `
      <div class="container-table" id="table-list">
        <div class="container-table-header">
          <img src="${value.image}" class="imagen-list">
        </div>
          <div class="container-table-body">
              <div class="container-row-header">
                  <div class="cell-item">Nombre</div>
              </div>  
              <div class="container-row-body">
                <div class="cell-item">${value.name}</div>
              </div>
          </div>
          <div class="container-table-footer">
            <img src="../assets/icon/edit.svg" class="img-svg-2" onclick="AgregarEditar('categoria','PUT',${value.id})">
            <img src="../assets/icon/delete.svg" class="img-svg-2" onclick="deleteCategoria(${value.id})"> 
          </div>
      </div>  `;

    document.getElementById("listCategoria").innerHTML = template;
  });
};

const registrarProducto = (verb) => {
  let formData = new FormData();

  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let image = document.getElementById("imageProducto").files[0];
  let detalil1 = document.getElementById("detalil1").value;
  let detalil2 = document.getElementById("detalil2").value;
  let id = document.getElementById("idproducto").value;
  let category = document.getElementById("optionCategoria").value;
  let method = verb;

  formData.append("name", name);
  formData.append("price", price);
  formData.append("image", image);
  formData.append("detalil1", detalil1);
  formData.append("detalil2", detalil2);
  formData.append("id", id);
  formData.append("category", category);
  formData.append("method", method);

  $.ajax({
    url: "views/producto.php",
    type: "POST",
    data: formData,
    contentType: false,
    cache: false,
    processData: false,
    success: (data) => {
      getProductAll();
      document.getElementById("modal-btn").checked = false;
    },
  });
};

const showDataProducto = (data) => {
  $.get(`views/producto.php?idshow=${data}`, (value) => {
    document.getElementById("modal-btn").checked = true;
    const producto = JSON.parse(value);
    producto.map((value) => {
      document.getElementById("name").value = value.name;
      //document.getElementById("image").value = value.image;
      document.getElementById("detalil1").value = value.detail1;
      document.getElementById("detalil2").value = value.detail2;
      document.getElementById("idproducto").value = value.id;
      document.getElementById("optionCategoria").value = value.category;
      document.getElementById("price").value = value.price;
      document.getElementById("idproducto").value = value.id;
    });
  });
};

const deleteProducto = (id, method = "DELETE") => {
  $.post("views/producto.php", { id, method }, () => {
    getProductAll();
  });
};

//CATEGORIA

const showDataCategoria = (data) => {
  $.get(`views/categoria.php?idshow=${data}`, (value) => {
    document.getElementById("modal-btn").checked = true;
    const categoria = JSON.parse(value);
    categoria.map((value) => {
      document.getElementById("name").value = value.name;
      //document.getElementById("image").value = value.image;
      document.getElementById("idcategoria").value = value.id;
    });
  });
};

const deleteCategoria = (id, method = "DELETE") => {
  $.post("views/categoria.php", { id, method }, () => {
    getCategoryAll();
  });
};

const registrarCategoria = (verb) => {
  let formData = new FormData();
  let name = document.getElementById("name").value;
  let image = document.getElementById("imageCategoria").files[0];
  let id = document.getElementById("idcategoria").value;
  let method = verb;
  formData.append("name", name);
  formData.append("image", image);
  formData.append("method", method);
  formData.append("id", id);

  $.ajax({
    url: "views/categoria.php",
    type: "POST",
    data: formData,
    contentType: false,
    cache: false,
    processData: false,
    success: (data) => {
      getCategoryAll();
      document.getElementById("modal-btn").checked = false;
    },
  });
};

const onPreview = (e) => {
  const reader = new FileReader();
  reader.onload = imageIsLoaded;
  reader.readAsDataURL(e.target.files[0]);
};

const imageIsLoaded = (e) => {
  $("#file").css("color", "green");
  $("#image_preview").css("display", "block");
  $("#previewing").attr("src", e.target.result);
  $("#previewing").attr("width", "100%");
  $("#previewing").attr("height", "230px");
};

/********************LOGIN******************/

const auth = () => {
  let user = document.getElementById("useradmin").value;
  let password = document.getElementById("passworadmin").value;
  const params = { user, password };
  $.post(`views/auth.php`, params, (value) => {
    let data = JSON.parse(value);
    if (data.status) {
      seData(JSON.parse(data.data));
      return;
    }
    Toast(data.message);
  });
};

const seData = (data) => {
  data.map((val) => {
    localStorage.setItem("sessionAdmin", true);
    localStorage.setItem("userAdmin", JSON.stringify(val));
    templateHome();
  });
};

/***********************TOASTER**************************/
const Toast = (text) => {
  let message = document.getElementById("snackbar");
  message.innerText = text;
  message.className = "show show-success";
  setTimeout(() => {
    message.className = message.className.replace("show", "");
  }, 3000);
};

/********************ORDER************************/

const getOrderAll = (
  fecha = moment().format("YYYY-MM-DD"),
  key = "LISTADO",
  status = "PENDIENTE"
) => {
  $.get(
    `views/order.php?fecha=${fecha}&consulta=${key}&status=${status}`,
    (value) => {
      templateListaOrder(JSON.parse(value));
    }
  );
};

const getOrderForDate = (
  fecha = moment().format("YYYY-MM-DD"),
  key = "CANTIDAD-PENDIENTE",
  status = "PENDIENTE"
) => {
  $.get(
    `views/order.php?fecha=${fecha}&consulta=${key}&status=${status}`,
    (value) => {
      templateCountPendiente(JSON.parse(value));
      templateCountAtendiddo(JSON.parse(value));
    }
  );
};

const templateListaOrder = (data) => {
  let template = "";
  data.map((value) => {
    const COLOR_FONO = {
      PENDIENTE: "bg-danger",
      ATENDIDO: "bg-success",
    };

    template += `<div class="container-table" id="table-list">
                  <div class="container-table-header">
                    <img src="../assets/icon/male-avatar.svg" class="imagen-list">
                  </div>
                    <div class="container-table-body">
                        <div class="container-row-header">
                            <div class="cell-item">Client</div>
                            <div class="cell-item">payment_type</div>
                            <div class="cell-item">order_status</div>
                            <div class="cell-item">fecha</div>
                        </div>
                        <div class="container-row-body">
                          <div class="cell-item">${value.client}</div>
                          <div class="cell-item">${value.payment_type}</div>
                          <div class="cell-item">${value.fecha}</div>
                          <div class="cell-item">
                           <div class="alert__status ${
                             COLOR_FONO[value.order_status]
                           } text-white" role="alert">
                           ${value.order_status}
                            </div>
                          </div>
                        </div>
                    </div>
                    <div class="container-table-footer">
                      <img src="../assets/icon/edit.svg" class="img-svg-2" onclick="showOrder()">
                    </div>
            </div>`;
    document.getElementById("listOrder").innerHTML = template;
  });
};

const templateCountPendiente = (data) => {
  data.map((value) => {
    if (value.status === "PENDIENTE") {
      document.getElementById("countOrderPendiente").innerHTML = `
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <div class="me-3">
                  <div class="text-white-75 fw-bold small">${value.status}</div>
                  <div class="text-lg fw-bold">${value.cantidad}</div>
                </div>            
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign feather-xl text-white-50"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
          </div>
        `;
    }
  });
};

const templateCountAtendiddo = (data) => {
  data.map((value) => {
    if (value.status === "ATENDIDO") {
      document.getElementById("countOrderAtendido").innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <div class="me-3">
            <div class="text-white-75 fw-bold small">${value.status}</div>
            <div class="text-lg fw-bold">${value.cantidad}</div>
          </div>            
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign feather-xl text-white-50"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        </div>
      </div>
    `;
    }
  });
};

const showOrder = () => {
  $.get(`views/order.php?idshow=1`, (value) => {
    document.getElementById("viewDetail").style.display = "none";
    document.getElementById("templateDynamic").style.display = "block";
    document.getElementById("modal-btn").checked = true;
    let data = JSON.parse(value);
    let template = "";
    template += `<div class="modal-head" id="modal-head">
                  <h1 class="modal-title text-center" id="title-modal">Detalle Orden</h1>
                  </div>  
                  <div class="modal-body" id="modal-body">
                    ${openModalOrder(data)}
                  </div>
                  <div class="modal-footer" id="modal-footer">
                      <button class="btn-add" onclick="updateStatus()">
                        <span class="info-payment">
                          <img src="../assets/icon/hand.svg">
                        </span>
                      </button>
                </div>
                  `;
    document.getElementById("templateDynamic").innerHTML = template;
  });
};
const openModalOrder = (data) => {
  return data.map((data) => {
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
                        <input type="hidden" value=${data.idOrder} id="idOrder">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          `;
  });
};

const updateStatus = () => {
  let idOrder = document.getElementById("idOrder").value;
  const params = { idOrder, method: "PUT" };
  $.post(`views/order.php?`, params, (value) => {
    getOrderAll();
    getOrderForDate(moment().format("YYYY-MM-DD"), "CANTIDAD-PENDIENTE");
    getOrderForDate(
      moment().format("YYYY-MM-DD"),
      "CANTIDAD-ATENDIDO",
      "ATENDIDO"
    );

    document.getElementById("templateDynamic").innerHTML =
      "<h1>Se actualizo</h1>";

    setTimeout(() => {
      document.getElementById("modal-btn").checked = false;
    }, 500);
  });
};

/*****************DASHBOARD******************/

const salesTotal = () => {
  $.get(`views/payment.php?consulta=TOTALES`, (value) => {
    const { status, data } = JSON.parse(value);
    let template = "";
    if (status) {
      let value = JSON.parse(data);
      value.map((value) => {
        const COLOR_FONO = {
          PAYPAL: "bg-primary",
          TIENDA: "bg-warning",
          TOTAL: "bg-success",
        };

        template += `
        <div class="card  ${
          COLOR_FONO[value.wayToPay]
        } text-white mr-5 w__card__25 h-100">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <div class="me-3">
              <div class="text-white-75 fw-bold small">${value.wayToPay}</div>
              <div class="text-lg fw-bold">$${value.salesTotal}</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign feather-xl text-white-50"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
        </div>
      </div>
     `;
      });
      document.getElementById("salesTotal").innerHTML = template;
    }
  });
};

const topProduct = () => {
  $.get(`views/payment.php?consulta=TOP`, (value) => {
    const { status, data } = JSON.parse(value);
    let dataTopProduct = JSON.parse(data);
    let template = "";
    dataTopProduct.map((value) => {
      template += `
        <div class="d-flex justify-content-between ">
          <div class="w-50 p-3">
            <img src="${value.image}" width="145px" heigth="100px"> 
          </div>        
          <div class="w-50 p-3 d-flex flex-column align-items-center">
            <span class="fw-bold small" >${value.name}</span>
            <span class="text-lg fw-bold" >${value.count} sales</span>
            <span>$ ${value.price}</span>
          </div>
        </div>
      `;
      document.getElementById("topProducto").innerHTML = template;
    });
  });
};
