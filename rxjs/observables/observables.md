Un observable es una clase de typescript que escucha lo cambios de un dato, se puede suscribir y desuscribir funciona con el pipe asyncrono.

# Respuestas de observables:

subscribe({
  next: (x: number) => console.log('Observer got a next value: ' + x), // respuesta
  error: (err: Error) => console.error('Observer got an error: ' + err), // catherror
  complete: () => console.log('Observer got a complete notification'), // callback
})

#