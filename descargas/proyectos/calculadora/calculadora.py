"""
Calculadora de consola
Proyecto: Aprender tecnología haciendo — Walter Sebastián Fernández
Conceptos: variables, entrada/salida, condicionales, bucles, funciones y errores.
"""


def sumar(a, b):
    return a + b


def restar(a, b):
    return a - b


def multiplicar(a, b):
    return a * b


def dividir(a, b):
    if b == 0:
        raise ZeroDivisionError("No se puede dividir por cero.")
    return a / b


OPERACIONES = {
    "1": ("Sumar", "+", sumar),
    "2": ("Restar", "-", restar),
    "3": ("Multiplicar", "x", multiplicar),
    "4": ("Dividir", "/", dividir),
}


def pedir_numero(mensaje):
    """Pide un número hasta que el usuario escriba uno válido."""
    while True:
        texto = input(mensaje).replace(",", ".")
        try:
            return float(texto)
        except ValueError:
            print("  ⚠ Eso no es un número. Probá de nuevo.")


def mostrar_menu():
    print("\n=== CALCULADORA ===")
    for clave, (nombre, simbolo, _) in OPERACIONES.items():
        print(f"  {clave}) {nombre} ({simbolo})")
    print("  0) Salir")


def main():
    historial = []
    while True:
        mostrar_menu()
        opcion = input("Elegí una opción: ").strip()

        if opcion == "0":
            break
        if opcion not in OPERACIONES:
            print("  ⚠ Opción inválida.")
            continue

        nombre, simbolo, funcion = OPERACIONES[opcion]
        a = pedir_numero("Primer número: ")
        b = pedir_numero("Segundo número: ")

        try:
            resultado = funcion(a, b)
        except ZeroDivisionError as error:
            print(f"  ⚠ {error}")
            continue

        linea = f"{a:g} {simbolo} {b:g} = {resultado:g}"
        historial.append(linea)
        print(f"  ✔ {linea}")

    print("\nHistorial de la sesión:")
    for i, linea in enumerate(historial, start=1):
        print(f"  {i}. {linea}")
    print("¡Hasta la próxima!")


if __name__ == "__main__":
    main()
