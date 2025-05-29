function enviarEstado() {
  const radios = document.getElementsByName("estado");
  const mensaje = document.getElementById("mensaje").value.trim();

  let valorSeleccionado = null;

  for (const radio of radios) {
    if (radio.checked) {
      valorSeleccionado = radio.value;
      break;
    }
  }

  if (!valorSeleccionado) {
    alert("Selecciona tu estado de ánimo.");
    return;
  }

  const estados = {
    "1": { emoji: "😔", texto: "Muy mal" },
    "2": { emoji: "😟", texto: "Mal" },
    "3": { emoji: "😐", texto: "Regular" },
    "4": { emoji: "🙂", texto: "Bien" },
    "5": { emoji: "😄", texto: "Excelente" }
  };

  const estado = estados[valorSeleccionado];
  let resultadoTexto = `Estado de ánimo: ${valorSeleccionado} / 5 - ${estado.texto} ${estado.emoji}`;

  if (mensaje !== "") {
    resultadoTexto += `<br>Comentario adicional: "${mensaje}"`;
  } else {
    resultadoTexto += `<br>No se ingresó comentario adicional.`;
  }

  resultadoTexto += `<br><br>✅ ¡Gracias por compartir cómo te sientes!`;

  document.getElementById("resultado").innerHTML = resultadoTexto;

  // 🔴 GUARDAR AUTOMÁTICAMENTE EN GOOGLE SHEETS
  const datos = {
    nombre: "Estudiante", // puedes reemplazar esto por un input de nombre si quieres
    estado: `${valorSeleccionado} - ${estado.texto}`,
    comentario: mensaje
  };

  fetch("https://script.google.com/macros/s/AKfycbxmhFdS6BYkfO41kGl-AxR-bzNhNUM6vq5SjwQME5gwzJeAJKnlGNJs9BjHWkPl0NpB/exec", {
    method: "POST",
    body: JSON.stringify(datos),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(respuesta => {
    if (respuesta.resultado !== "OK") {
      alert("⚠️ Ocurrió un error al guardar en Google Sheets.\nDetalle: " + respuesta.detalle);
    }
  })
  .catch(error => {
    alert("⚠️ Error al conectar con Google Sheets.\n" + error);
    console.error(error);
  });
}
