let ingresos = [
    new Ingreso(1, "Sueldo", 400),
    new Ingreso(2, "Venta", 400)
];

let egresos = [
    new Egreso(1, "Renta", 200),
    new Egreso(2, "Comida", 100)
];

let idIngreso = 3;
let idEgreso = 3;
let pestaña = "ingreso";

function titulo() {
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let fecha = new Date();
    document.getElementById("titulo").textContent = "Presupuesto de " + meses[fecha.getMonth()] + " " + fecha.getFullYear();
}

function totalIngresos() {
    let total = 0;
    for (let i = 0; i < ingresos.length; i++) {
        total += ingresos[i].valor;
    }
    return total;
}

function totalEgresos() {
    let total = 0;
    for (let i = 0; i < egresos.length; i++) {
        total += egresos[i].valor;
    }
    return total;
}

function actualizar() {
    let ing = totalIngresos();
    let egr = totalEgresos();
    let saldo = ing - egr;

    if (saldo >= 0) {
        document.getElementById("saldo").textContent = "+ " + saldo.toFixed(2);
    } else {
        document.getElementById("saldo").textContent = "- " + Math.abs(saldo).toFixed(2);
    }

    document.getElementById("totalIngresos").textContent = "+ " + ing.toFixed(2);
    document.getElementById("totalEgresos").textContent = "- " + egr.toFixed(2);

    let porc = 0;
    if (ing > 0) {
        porc = (egr * 100) / ing;
    }
    document.getElementById("porcGlobal").textContent = Math.round(porc) + "%";
}

function ver(tipo) {
    pestaña = tipo;
    if (tipo == "ingreso") {
        document.getElementById("tabIng").className = "btn btn-dark w-50 rounded-0";
        document.getElementById("tabEgr").className = "btn btn-secondary w-50 rounded-0";
    } else {
        document.getElementById("tabEgr").className = "btn btn-dark w-50 rounded-0";
        document.getElementById("tabIng").className = "btn btn-secondary w-50 rounded-0";
    }
    mostrar();
}

function mostrar() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";
    let ing = totalIngresos();

    if (pestaña == "ingreso") {
        for (let i = 0; i < ingresos.length; i++) {
            let div = document.createElement("div");
            div.className = "list-group-item d-flex justify-content-between align-items-center bg-white mt-2";
            div.innerHTML = "<span>" + ingresos[i].descripcion + "</span><span>+ " + ingresos[i].valor.toFixed(2) + "<button class='btn btn-link btn-sm text-muted' onclick='eliminarIngreso(" + ingresos[i].id + ")'>x</button></span>";
            lista.appendChild(div);
        }
    } else {
        for (let j = 0; j < egresos.length; j++) {
            let p = 0;
            if (ing > 0) {
                p = (egresos[j].valor * 100) / ing;
            }
            let div2 = document.createElement("div");
            div2.className = "list-group-item d-flex justify-content-between align-items-center bg-white mt-2";
            div2.innerHTML = "<span>" + egresos[j].descripcion + "</span><span>- " + egresos[j].valor.toFixed(2) + "<span class='badge badge-dark ml-2'>" + Math.round(p) + "%</span><button class='btn btn-link btn-sm text-muted' onclick='eliminarEgreso(" + egresos[j].id + ")'>x</button></span>";
            lista.appendChild(div2);
        }
    }
}

function agregar() {
    let tipo = document.getElementById("tipo").value;
    let desc = document.getElementById("descripcion").value.trim();
    let monto = parseFloat(document.getElementById("monto").value);
    let error = document.getElementById("error");
    error.textContent = "";

    if (desc == "") {
        error.textContent = "Ingrese una descripción.";
        return;
    }
    if (isNaN(monto) || monto <= 0) {
        error.textContent = "Ingrese un monto válido mayor a 0.";
        return;
    }

    if (tipo == "ingreso") {
        ingresos.push(new Ingreso(idIngreso, desc, monto));
        idIngreso++;
        ver("ingreso");
    } else {
        egresos.push(new Egreso(idEgreso, desc, monto));
        idEgreso++;
        ver("egreso");
    }

    document.getElementById("descripcion").value = "";
    document.getElementById("monto").value = "";
    actualizar();
    mostrar();
}

function eliminarIngreso(id) {
    ingresos = ingresos.filter(function (e) { return e.id != id; });
    actualizar();
    mostrar();
}

function eliminarEgreso(id) {
    egresos = egresos.filter(function (e) { return e.id != id; });
    actualizar();
    mostrar();
}

titulo();
actualizar();
mostrar();