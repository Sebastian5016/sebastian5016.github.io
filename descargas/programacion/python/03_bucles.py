# Bucles: for y while

# for: repetir una cantidad conocida de veces
for numero in range(1, 11):
    print(f"7 x {numero} = {7 * numero}")

# while: repetir mientras se cumpla una condición
clave = ""
while clave != "python":
    clave = input("Adiviná la palabra secreta: ").lower()
print("¡Correcto!")
