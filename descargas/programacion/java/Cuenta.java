/** Programación orientada a objetos: clase, atributos, métodos y encapsulamiento. */
public class Cuenta {
    private final String titular;
    private double saldo;

    public Cuenta(String titular) {
        this.titular = titular;
        this.saldo = 0;
    }

    public void depositar(double monto) {
        if (monto <= 0) throw new IllegalArgumentException("Monto inválido");
        saldo += monto;
    }

    public boolean extraer(double monto) {
        if (monto > saldo) return false;
        saldo -= monto;
        return true;
    }

    public double getSaldo() { return saldo; }

    public static void main(String[] args) {
        Cuenta c = new Cuenta("Estudiante");
        c.depositar(1500);
        System.out.println("¿Extracción de 2000? " + c.extraer(2000));
        System.out.println("Saldo: " + c.getSaldo());
    }
}
