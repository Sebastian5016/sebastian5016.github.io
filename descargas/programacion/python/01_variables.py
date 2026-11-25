# Variables y tipos de datos en Python
nombre = "Lucía"          # str  (texto)
edad = 15                 # int  (entero)
altura = 1.62             # float (decimal)
estudia = True            # bool (verdadero/falso)

print("Nombre:", nombre)
print(f"{nombre} tiene {edad} años y mide {altura} m.")
print("Tipo de edad:", type(edad))

# Las variables pueden cambiar de valor
edad = edad + 1
print("El año que viene tendrá", edad)
