let dummyMenu = {
  1: {
    item: "Dosa",
    price: 50,
    count: 0,
  },
  2: {
    item: "Idli",
    price: 40,
    count: 0,
  },
  3: {
    item: "Pizza",
    price: 80,
    count: 0,
  },
  4: {
    item: "Burger",
    price: 45,
    count: 0,
  },
  5: {
    item: "Momos",
    price: 60,
    count: 0,
  },
  6: {
    item: "Sev Puri",
    price: 25,
    count: 0,
  },
};

let menu = JSON.parse(localStorage.getItem("menu")) || dummyMenu;

function itemdata() {
  for (const i in menu) {
    document.querySelector(
      ".item-container"
    ).innerHTML += `<div class="itembox" id="item${i}">
        <span class="code">${i}.</span>
        <span class="item">${menu[i]["item"]}</span>
        <span class="quan">
            <span class="minus${i}">-</span>
            <span class="qcount${i}">${menu[i]["count"]}</span>
            <span class="plus${i}">+</span>
        </span>
        <span class="price">₹${menu[i]["price"]}</span>
        </div>`;
  }
}

function countReset() {
  for (const i in menu) {
    menu[i]["count"] = 0;
  }
}

function display() {
  for (const i in menu) {
    let count = menu[i]["count"];

    const plus = document.querySelector(`.plus${i}`),
      qcount = document.querySelector(`.qcount${i}`),
      minus = document.querySelector(`.minus${i}`);

    plus.addEventListener("click", () => {
      count++;
      qcount.innerText = count;
      menu[i]["count"] = count;
      billUpdate();
    });
    minus.addEventListener("click", () => {
      if (count > 0) {
        count--;
        qcount.innerText = count;
        menu[i]["count"] = count;
        billUpdate();
      }
    });
  }
}

function billUpdate() {
  const stotal = document.querySelector("#subtotal"),
    serv = document.querySelector("#service"),
    sgst = document.querySelector("#sgst"),
    cgst = document.querySelector("#cgst"),
    grantotal = document.querySelector("#total");
  stotal.innerText = `₹${subtotal().toFixed(2)}`;
  serv.innerText = `₹${service().toFixed(2)}`;
  sgst.innerText = `₹${sgst_cgst().toFixed(2)}`;
  cgst.innerText = `₹${sgst_cgst().toFixed(2)}`;
  grantotal.innerText = `₹${total().toFixed(2)}`;
}

function subtotal() {
  let stotal = 0;
  for (const i in menu) {
    stotal += menu[i]["count"] * menu[i]["price"];
  }
  return stotal;
}

function service() {
  let stotal = subtotal();
  return 0.1 * stotal;
}

function sgst_cgst() {
  let stotal = subtotal();
  return 0.09 * stotal;
}

function total() {
  let total = subtotal() + service() + sgst_cgst() + sgst_cgst();
  return total;
}

itemdata();
display();

function itemUpdateMenu() {
  const add = document.getElementById("add-menu"),
    remove = document.getElementById("remove-menu"),
    additem = document.getElementById("add-item"),
    removeitem = document.getElementById("remove-item"),
    menu = document.getElementById("input-menu");

  remove.addEventListener("click", () => {
    removeitem.style.display = "block";
    additem.style.display = "none";
    menu.style.background = "linear-gradient(90deg, #fdd3b9 50%, #ffbb91 50%)";
  });

  add.addEventListener("click", () => {
    additem.style.display = "block";
    removeitem.style.display = "none";
    menu.style.background = "linear-gradient(90deg, #ffbb91 50%, #fdd3b9 50%)";
  });
}

itemUpdateMenu();

function addItem() {
  let addbtn = document.querySelector("#add-btn");
  addbtn.addEventListener("click", () => {
    const nitem = document.querySelector("#new-item").value,
      nprice = parseInt(document.querySelector("#new-price").value),
      ni = document.querySelector("#new-item"),
      np = document.querySelector("#new-price"),
      ncode = Object.keys(menu).length + 1;
    if (nprice <= 0) {
      alert("Invalid Input: Can't have negative or zero price.");
      return;
    }
    if (nitem === "" || nprice === "") {
      return;
    }
    const codeobj = { item: nitem, price: nprice, count: 0 };
    Object.assign(menu, {
      [ncode]: codeobj,
    });
    document.querySelector(
      ".item-container"
    ).innerHTML += `<div class="itembox" id="item${ncode}">
            <span class="code">${ncode}.</span>
            <span class="item">${menu[ncode]["item"]}</span>
            <span class="quan">
                <span class="minus${ncode}">-</span>
                <span class="qcount${ncode}">${menu[ncode]["count"]}</span>
                <span class="plus${ncode}">+</span>
            </span>
            <span class="price">₹${menu[ncode]["price"]}</span>
            </div>`;
    ni.value = "";
    np.value = "";
    countReset();
    localStorage.setItem("menu", JSON.stringify(menu));
    display();
  });
}

addItem();

function removeItem() {
  let removebtn = document.querySelector("#remove-btn");
  removebtn.addEventListener("click", () => {
    let ncode = document.getElementById("new-code").value,
      nc = document.getElementById("new-code"),
      icontain = document.querySelector(".item-container");
    if (ncode === "") {
      return;
    }
    if (ncode <= 0) {
      alert("Invalid Input: Can't have negative or zero code.");
      return;
    }
    delete menu[ncode];
    let nmenu = {};
    Object.keys(menu).forEach((k, index) => {
      nmenu[index + 1] = menu[k];
    });
    menu = nmenu;
    while (icontain.firstChild) {
      icontain.removeChild(icontain.firstChild);
    }
    nc.value = "";
    countReset();
    localStorage.setItem("menu", JSON.stringify(menu));
    itemdata();
    display();
    billUpdate();
  });
}

removeItem();

function changePage() {
  const admin = document.getElementById("admin"),
    index = document.getElementById("index");

  admin.addEventListener("click", () => {
    document.getElementById("container").style.display = "none";
    let adminLink = document.createElement("link");
    let indexLink = document.getElementById("index-css");
    indexLink.remove();
    adminLink.rel = "stylesheet";
    adminLink.href = "admin.css";
    adminLink.id = "admin-css";
    document.querySelector("head").append(adminLink);
    adminLink.addEventListener("load", () => {
      document.getElementById("container").style.display = "block";
    });
  });
  index.addEventListener("click", () => {
    document.getElementById("container").style.display = "none";
    let indexLink = document.createElement("link");
    let adminLink = document.getElementById("admin-css");
    adminLink.remove();
    indexLink.rel = "stylesheet";
    indexLink.href = "style.css";
    indexLink.id = "index-css";
    document.querySelector("head").append(indexLink);
    indexLink.addEventListener("load", () => {
      document.getElementById("container").style.display = "block";
    });
  });
}

changePage();
