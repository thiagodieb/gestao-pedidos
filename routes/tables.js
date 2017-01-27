var express = require('express');
var router = express.Router();
var conn = require('../models/connbd');


router.get('/', function(req, res, next) {
	var s = ` 
            SELECT 
                id,id_sessao,id_parceiro,id_operador,descricao,status,servico,quant_pessoas,dataHoraAbertura,dataHoraUltimaAtualizacao,emFechamento,textoAbertura,NumeroSerieUltimaConferencia,COOUltimaConferencia,NumeroSerieUltimoCF,COOUltimoCF,hash_PAF 
            FROM tb_pdv_mesas`;

    conn.connect(function(c){
        c.select(s,function(returnQuery){
		console.log(returnQuery);
        res.render('tables',{'content':returnQuery,'title':'Mesas'});
        });
    });
  

  
});



router.get('/summary/:id', function(req, res, next) {
    var id = req.params.id;
    console.log(id);
    
    var s = ` 
            SELECT 
                id,id_sessao,id_parceiro,id_operador,descricao,status,servico,quant_pessoas,dataHoraAbertura,dataHoraUltimaAtualizacao,emFechamento,textoAbertura,NumeroSerieUltimaConferencia,COOUltimaConferencia,NumeroSerieUltimoCF,COOUltimoCF,hash_PAF 
            FROM 
                tb_pdv_mesas
            WHERE 
                id =`+id;

 	var s2 = ` SELECT 
            * 
            FROM 
            dbo.tb_comercio_produto_grupo1 where id=`+id; 

	var categoriesExcluded = [];
	var categoriesFinal = new Array();

    conn.connect(function(c){
    	c.select(s2,function(returnQuery){
    		
    		returnContent = {'title':returnQuery[0].descricao};
        	c.select(s,function(returnQuery2){
        		console.log(returnQuery2);
		       	for (var i = returnQuery2.length - 1; i >= 0; i--) {
		       		for (var j = categoriesExcluded.length - 1; j >= 0; j--) {
		       			if(categoriesExcluded[j] != returnQuery2[i].id ){
		       				categoriesFinal.push(returnQuery2[i]);
		       				break;
		       			}
		       		};

		       	};

        		returnContent.categories = categoriesFinal;
        		res.render('categories',returnContent);
        	});
        });
    });
  

  
});



router.get('/sub-categorie/:id', function(req, res, next) {
    var id = req.params.id;
    console.log(id);
    
    var s = ` SELECT 
            id,vende,codigo1,codigo2,descricao,id_grupo1,preco_venda,preco_compra,EstoqueControla,EstoqueQuantidade,IsMateriaPrima,PodeAlterarPreco,PermiteDesconto,id_grupo1_sub,estoqueIgnora,hash_PAF,permiteValorZerado,TaxaRoyalties,id_tipo_produto 
            FROM 
            dbo.tb_comercio_produto 
            WHERE 
                id_grupo1_sub = `+ id; 

 	var s2 = ` SELECT 
            * 
            FROM 
            dbo.tb_comercio_produto_grupo1_sub where id=`+id; 

    conn.connect(function(c){
    	c.select(s2,function(returnQuery){
    		
    		returnContent = {'title':returnQuery[0].descricao};
        	c.select(s,function(returnQuery2){
        		console.log(returnQuery2);
        		returnContent.categories = returnQuery2;
        		res.render('categories',returnContent);
        	});
        });
    });
  

  
});



router.get('/product/:id', function(req, res, next) {
    var id = req.params.id;
    console.log(id);
    
    var s = ` SELECT 
            id,vende,codigo1,codigo2,descricao,id_grupo1,preco_venda,preco_compra,EstoqueControla,EstoqueQuantidade,IsMateriaPrima,PodeAlterarPreco,PermiteDesconto,id_grupo1_sub,estoqueIgnora,hash_PAF,permiteValorZerado,TaxaRoyalties,id_tipo_produto 
            FROM 
            dbo.tb_comercio_produto 
            WHERE 
                id_grupo1 = `+ id;

 	var s2 = ` SELECT 
            * 
            FROM 
            dbo.tb_comercio_produto_grupo1 where id=`+id; 

    conn.connect(function(c){
    	c.select(s2,function(returnQuery){
    		
    		returnContent = {'title':returnQuery[0].descricao};
        	c.select(s,function(returnQuery2){
        		console.log(returnQuery2);
        		returnContent.categories = returnQuery2;
        		res.render('categories',returnContent);
        	});
        });
    });
  

  
});



module.exports = router;
