
$(document).ready(function(){

  $("a").on('click', function(event) {

    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top - 20
      }, 700, function(){
  
        window.location.hash = "";
      });
    }

  });


  $.each(docs, (key, doc) => {
        
    let head = '<div class="row mb-0"> \
                  <div class="col s12"><span class="'+ doc.method.toLowerCase() +'">'+ doc.method +'</span> &emsp; <span class="resource">'+ doc.endpoint +'</span></div> \
                </div> \
                \
                <div class="row"> \
                  <div class="col s12"> \
                    <table> \
                      <thead> \
                        <tr>  \
                          <th colspan="3" style="border-bottom: 1px solid #d7d7d7;">Parâmetro</th> \
                          <th>Descrição</th> \
                        </tr> \
                      </thead> \
                      \
                      <tbody>';

    let linhas;
    $.each(doc.params, (key, param) => {

      required = (param.required == "true") ? "obrigatório" : "opcional";

      linhas += '<tr> \
                    <td style="width: 8%"><span class="type">'+ param.type +'</span></td> \
                    <td style="width: 20%"><span class="param">'+ param.name +'</span></td> \
                    <td style="width: 12%"><span class="requirement">('+ required +')</span></td> \
                    <td>'+ param.description +'</td> \
                  </tr>';
    });

    let tail = '    </tbody> \
                  </table> \
                </div> \
              </div>';

    $("#" + doc.id).append(head).append(linhas).append(tail);

  });

});