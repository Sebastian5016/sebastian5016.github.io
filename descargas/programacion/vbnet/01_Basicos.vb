Module Basicos
    Sub Main()
        Dim nombre As String
        Dim edad As Integer

        Console.Write("Nombre: ")
        nombre = Console.ReadLine()
        Console.Write("Edad: ")
        edad = Integer.Parse(Console.ReadLine())

        If edad >= 18 Then
            Console.WriteLine($"{nombre} es mayor de edad.")
        Else
            Console.WriteLine($"A {nombre} le faltan {18 - edad} años para los 18.")
        End If

        For i As Integer = 1 To 5
            Console.WriteLine($"Vuelta {i}")
        Next
    End Sub
End Module
