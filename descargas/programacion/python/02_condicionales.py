# Condicionales: if / elif / else
nota = float(input("Ingresá tu nota: "))

if nota >= 9:
    print("¡Excelente!")
elif nota >= 6:
    print("Aprobado")
elif nota >= 4:
    print("En proceso: necesitás reforzar")
else:
    print("Desaprobado: pedí ayuda, ¡se puede!")
