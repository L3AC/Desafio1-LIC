//CLASES DE NUESTRO SISTEMA 

// ES LA CLASE PADRE DE LA CUAL HEREDAN INGRESO Y EGRESO
class Transaccion {
    constructor(id, descripcion, valor) {
        this.id = id;
        this.descripcion = descripcion;
        this.valor = valor;
    }
}


class Ingreso extends Transaccion {
    constructor(id, descripcion, valor) {
        super(id, descripcion, valor);
    }
}

class Egreso extends Transaccion {
    constructor(id, descripcion, valor) {
        super(id, descripcion, valor);
    }
}