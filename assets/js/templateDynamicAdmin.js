$(document).ready(() => {
  const AUTH = JSON.parse(localStorage.getItem("sessionAdmin"));
  !AUTH && templateLogin();
  AUTH && templateHome();
});

const templateLogin = () => {
  document.getElementById("templateDynamicAdmin").style.margin = "0 1rem";
  document
    .getElementById("templateDynamicAdmin")
    .classList.add("container-login");

  let template = `  
      <div class="card-form" id="card-login">
      <h1 class="form-title">Login in</h1>
        <div class="group-form">
          <input type="text" class="form-input" placeholder=" " id="useradmin">
          <label class="label-control">User</label>
        </div>
        <div class="group-form">
          <input type="text" class="form-input" placeholder=" " id="passworadmin">
          <label class="label-control">Password</label>
        </div>
        <div class="group-form">
          <button type="button" onclick="auth()" class="btn-login">Sign in</button>
        </div>
      </div>
 `;
  document.getElementById("templateDynamicAdmin").innerHTML = template;
};

const templateSlider = () => {
  document.getElementById("templateDynamicAdmin").style.margin = "0";
  document
    .getElementById("templateDynamicAdmin")
    .classList.remove("container-login");
  return `
  <div class="wrapper">
  <nav id="sidebar">
      <div class="sidebar-header">
          <h3>Admin</h3>
      </div>
      <ul class="list-unstyled components">
          <p id="userName"></p>
          <li>
            <a href="#" onclick="templateDashboard()">Dashboard</a>
          </li>
          <li>
            <a href="#" onclick="templateOrder()">Ordenes</a>
          </li>
          <li>
              <a href="#" onclick="templateProduct()">Producto</a>
          </li>
          <li>
              <a href="#" onclick="templateCategoria()">Categoria</a>
          </li>
          <li>
              <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Otros</a>
              <ul class="collapse list-unstyled" id="pageSubmenu">
                  <li>
                      <a href="#">Otros 1</a>
                  </li>
                  <li>
                      <a href="#">Otros 2</a>
                  </li>
                  <li>
                      <a href="#">Otros 3</a>
                  </li>
              </ul>
          </li>
      </ul>

      <ul class="list-unstyled CTAs">
          <li>
              <a href="#" class="download" onclick="logout()">Cerrar Sesion</a>
          </li>
          <li>
              <a href="%" class="article">Open</a>
          </li>
      </ul>
  </nav>
  <div id="content">
  <nav class="navbar navbar-expand-md navbar-dark bg-dark"> 
    <div class="container-fluid">    
        <button type="button" id="sidebarCollapse" style="background:none;border:none">
            <img src="../assets/icon/square.svg" class="img-svg"> 
        </button>
        <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-align-justify"></i>
        </button> 
    </div>
</nav>
      <div class="template" id="template"></div>        
  </div>
</div>
  `;
};

const templateHome = () => {
  let template = `${templateSlider()}`;
  document.getElementById("templateDynamicAdmin").innerHTML = template;
  $("#sidebarCollapse").on("click", () => {
    $("#sidebar").toggleClass("active");
  });
  const useradmin = JSON.parse(localStorage.getItem("userAdmin")) || "";
  document.getElementById("userName").innerText = useradmin.firstname;
  templateDashboard();
};

const ocultarMenuLateral = () => {
  $("#sidebar").toggleClass("active");
};

const templateProduct = () => {
  //ocultarMenuLateral();
  const template = `
        <div class="container-btn">
          <button type="button" class="btn-button" onclick="AgregarEditar()">+Agregar</button>
        </div>
        <div class="container-responsive" id="listProduct"></div>        
    `;
  document.getElementById("template").innerHTML = template;
  getProductAll();
};

const templateCategoria = () => {
  //ocultarMenuLateral();
  const template = `
        <div class="container-btn">
          <button class="btn-button" onclick="AgregarEditar('categoria')">+Agregar</button>
        </div>
        <div class="container-responsive" id="listCategoria">
        </div>        
    `;
  document.getElementById("template").innerHTML = template;
  getCategoryAll();
};

const templateDashboard = () => {
  const template = `
      <div class="container-btn">
        <div class="card__container" id="salesTotal"></div>
      </div>
      <div class="container">
        <div class="card w__card__35">
          <div class="text-lg fw-bold p-3">
            Top product
          </div>
          <div class="card-body" id="topProducto"></div>
      </div>
  `;
  document.getElementById("template").innerHTML = template;
  salesTotal();
  topProduct();
};

const templateOrder = () => {
  const template = `
  <div class="container-btn">
    <div class="card__container">
      <div id="countOrderPendiente" class="card bg-danger text-white w__card__25 h-100"></div>
      <div id="countOrderAtendido" class="card bg-success text-white w__card__25 h-100"></div>
    </div>
  </div>
  <div class="container-responsive" id="listOrder">
  </div>        
`;
  document.getElementById("template").innerHTML = template;
  getOrderAll();
  getOrderForDate();
  getOrderForDate(
    moment().format("YYYY-MM-DD"),
    "CANTIDAD-ATENDIDO",
    "ATENDIDO"
  );
};

const AgregarEditar = (key = "producto", verb = "POST", data = "") => {
  document.getElementById("viewDetail").style.display = "none";
  document.getElementById("modal-btn").checked = true;

  const TEMPLATE_DYNAMIC = {
    categoria: templateRegistrarCategoria(verb),
    producto: templateRegistrarProducto(verb),
  };
  document.getElementById("templateDynamic").innerHTML = TEMPLATE_DYNAMIC[key];

  if (verb === "PUT" && key === "categoria") showDataCategoria(data);
  if (verb === "PUT" && key === "producto") showDataProducto(data);
};

const templateRegistrarProducto = (verb) => {
  getCategoryAll(false);
  let nombreBotonOrTitulo = verb === "POST" ? "Registrar" : "Actualizar";
  return `
  <div class="container-form  container-form-register animate__animated animate__fadeIn">
  <form autocomplete="off">
      <h1 class="form-title">Registrar producto</h1>
      <div class="group-form">
          <input type="text" id="name" class="form-input" placeholder=" ">
          <label class="label-control">Name</label>
      </div>
      <div class="group-form">
          <input type="text" id="price" class="form-input" placeholder=" ">
          <label class="label-control">Price</label>
      </div>
      <div class="group-form">
          <input type="text" id="detalil1" class="form-input" placeholder=" ">
          <label class="label-control">Detail 1</label>
      </div>
      <div class="group-form">
          <input type="text" id="detalil2" class="form-input" placeholder=" ">
          <label class="label-control">Detail 2</label>
      </div>
      <div class="group-form">
        <select id="optionCategoria" class="form-input"></select>
      </div>
      <div id="image_preview" class="group-form-preview">
        <img id="previewing" src="../assets/img/no-image.jpg" class="image-preview"/>
      </div>
      <div class="group-form">
          <input type="file" id="imageProducto" onChange="onPreview(event)" accept="image/*">
          <input type="hidden" id="idproducto">
      </div>
      <div class="group-form">
          <button type="button" class="btn-login" onclick="registrarProducto('${verb}')">${nombreBotonOrTitulo}</button>
      </div>
  </form>
</div>
  `;
};

const templateRegistrarCategoria = (verb) => {
  let nombreBotonOrTitulo = verb === "POST" ? "Registrar" : "Actualizar";
  return `
    <div class="container-form container-form-register animate__animated animate__fadeIn">
      <form autocomplete="off" id="categoriaForm" enctype="multipart/form-data">
          <h1 class="form-title">${nombreBotonOrTitulo} Categoria</h1>
          <div class="group-form">
              <input type="text" id="name" class="form-input" placeholder=" ">
              <label class="label-control">Name</label>
          </div>
          <div id="image_preview" class="group-form-preview">
            <img id="previewing" src="../assets/img/no-image.jpg" width="250" height="230" />
          </div>
          <div class="group-form">
              <input type="file" id="imageCategoria"  onChange="onPreview(event)" accept="image/*">
              <input type="hidden" id="idcategoria">
          </div>
          <div class="group-form">
          <button type="button" class="btn-login" onclick="registrarCategoria('${verb}')" >${nombreBotonOrTitulo}</button>
          </div>
      </form>
    </div>
  `;
};

const logout = () => {
  localStorage.setItem("sessionAdmin", false);
  localStorage.removeItem("userAdmin");
  templateLogin();
};
