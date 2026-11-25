# Funciones y listas

def promedio(numeros):
    """Devuelve el promedio de una lista de números."""
    if not numeros:
        return 0
    return sum(numeros) / len(numeros)


def aprobados(notas, minimo=6):
    return [n for n in notas if n >= minimo]


notas = [7, 4, 9, 6, 5, 10]
print("Notas:", notas)
print("Promedio:", round(promedio(notas), 2))
print("Aprobadas:", aprobados(notas))
print("Nota más alta:", max(notas))
