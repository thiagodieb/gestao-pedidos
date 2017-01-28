jQuery(document).ready(function($) {
    $(".clickable-row").click(function() {
        window.document.location = $(this).data("href");
    });
     $(".clickable-back").click(function() {
	    window.history.back();
    });

	$('#complemento').on('show.bs.modal', function (event) {
	  var button = $(event.relatedTarget) // Button that triggered the modal
	  var product = button.data('product') // Extract info from data-* attributes
	  var descricao = button.data('descricao') // Extract info from data-* attributes
	  var quantidade = button.data('quantidade')
	  var mesa = button.data('mesa') // Extract info from data-* attributes

	  var modal = $(this)
	  modal.find('.modal-title').text(descricao+' - ' + product)
	  modal.find('.modal-body input#product_id').val(product)
	  modal.find('.modal-body input#quantidade').val(quantidade);
	  modal.find('.modal-body input#mesa').val(mesa)
	});

	$('#adicionar').on('show.bs.modal', function (event) {
	  var button = $(event.relatedTarget) // Button that triggered the modal
	  var product = button.data('product') // Extract info from data-* attributes
	  var quantidade = button.data('quantidade')
	  var mesa = button.data('mesa') // Extract info from data-* attributes
	  
	  var modal = $(this)
	  modal.find('#adicionarLabel').text(' Mesa ' + mesa + ' - quant.:' + quantidade)
	  modal.find('.modal-body input#product_id').val(product);
	  modal.find('.modal-body input#quantidade').val(quantidade);
	  modal.find('.modal-body input#mesa').val(mesa);
	})      
});

 
