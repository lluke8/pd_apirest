
$(document).ready(function(){
  getNoticias();

  $("#salvarNoticia").click(function() {
    salvarNoticia();
  });
  
  
});

function getNoticias() {
  $.ajax({
    url : "http://127.0.0.1:8080/api/noticias",
    type : 'get',
    dataType: 'json',
  })
  .done(function(response){
    console.log(response);
    $("#noticias").html(gerarTabelaHtml(response));
  })
  .fail(function(){
    alert("Ocorreu um erro inesperado!");
  });
}

function gerarTabelaHtml(noticias) {
  result = '';

  $.each(noticias, function (i, n) {
    result += `<tr colspan="8">
      
      <td>${n.autor}</td>
      <td>${n.titulo}</td>
      <td>${n.data}</td>
      <td>${n.conteudo}</td>
      <td>
        <a href="#editEmployeeModal" class="edit" data-toggle="modal" onclick="loadNoticia(${n.id})">
          Editar
        </a>
        <a href="#" class="delete"  onclick="deletarNoticia(${n.id})">
          Remover
        </a>
      </td>
    </tr>`
  });

  return result;
}

function salvarNoticia() {
  let autor    = $("#addAutor").val();
  let titulo     = $("#addTitulo").val();
  let conteudo   = $("#addConteudo").val();

  $.ajax({
    url : "http://127.0.0.1:8080/api/noticias",
    type : 'POST',
    dataType: 'json',
    contentType: "application/x-www-form-urlencoded",
    data: {
      autor: autor,
      titulo: titulo,
      conteudo: conteudo
    },
  })
  .done(function(response){
    
    alert("Cadastrado realizado com sucesso!");
  })
  .fail(function(xhr, ajaxOptions, thrownError){
    
    alert('Error!!Titulo ja existe!! ')
  });
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function editarNoticia(id) {
  let titulo    = $("#n_titulo_edit").val();

  $.ajax({
    url : `http://127.0.0.1:8080/api/noticias/${id}/titulo/${titulo}`,
    type : 'PUT',
    dataType: 'json',
    contentType: "application/x-www-form-urlencoded"
  })
  .done(function(response){
    
    $("#editEmployeeModal").modal('hide');
    alert("Edit realizado com sucesso!");
    getNoticias();
  })
  .fail(function(xhr, ajaxOptions, thrownError){
    alert(extractErrorFromResponse(xhr.responseText));
  });
}

function loadNoticia(id) {
  $.ajax({
    url : `http://127.0.0.1:8080/api/noticias?id=${id}`,
    type : 'get',
    dataType: 'html',
  })
  .done(function(response){
    
    $("#editEmployeeModal").html(response);
  })
  .fail(function(xhr, ajaxOptions, thrownError){
    alert(extractErrorFromResponseHtml(xhr.responseText));
    $("#editEmployeeModal").modal("hide")
  });
}
function deletarNoticia(id) {
  $.ajax({
    url : `http://127.0.0.1:8080/api/noticias/${id}`,
    type : 'DELETE',
    dataType: 'xml',
    contentType: "application/xml",
  })
  .done(function(response){
    alert("Noticia removida!!!!");
    getNoticias();
  })
  .fail(function(xhr, ajaxOptions, thrownError){
    alert('Noticia nao foi encontrada!!');
  });
}