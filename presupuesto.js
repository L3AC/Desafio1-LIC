// Desafio Practico 1 - Punto 2: presupuesto disponible.
// Los totales de ingresos y egresos se calculan en app.js.

function calcularPresupuestoDisponible(totalIngresos, totalEgresos) {
    return totalIngresos - totalEgresos;
}

function mostrarPresupuestoDisponible(saldoDisponible) {
    let elementoSaldo = document.getElementById("saldo");

    if (saldoDisponible >= 0) {
        elementoSaldo.textContent = "+ " + saldoDisponible.toFixed(2);
    } else {
        elementoSaldo.textContent = "- " + Math.abs(saldoDisponible).toFixed(2);
    }
}
