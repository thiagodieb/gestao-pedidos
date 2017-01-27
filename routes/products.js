var express = require('express');
var router = express.Router();
var conn = require('../models/connbd');


module.exports = function(security) {

    router.get('/', security, function(req, res, next) {
    	var s = ` SELECT 
                * 
                FROM 
                dbo.tb_comercio_produto_grupo1`;


    	var categoriesDefined = [2,3];
    	var categoriesFinal = new Array();
        conn.connect(function(c){
            c.select(s,function(returnQuery){
           	for (var i = returnQuery.length - 1; i >= 0; i--) {

           		for (var j = categoriesDefined.length - 1; j >= 0; j--) {
           			if(categoriesDefined[j] == returnQuery[i].id ){
           				returnQuery[i].imagem = "/images/"+returnQuery[i].id+".jpg";
           				categoriesFinal.push(returnQuery[i]);
           				break;
           			}
           		};

           	};

    		console.log(categoriesFinal);

            res.render('products',{'categories':categoriesFinal,'title':'Produtos'});
            });
        });
      

      
    });



    router.get('/:id', security, function(req, res, next) {
         var id = req.params.id;
        console.log(id);
        var s = ` SELECT 
                    * 
                FROM 
                    tb_comercio_produto 
                WHERE 
                    id=`+id;
        conn.connect(function(c){
            c.select(s,function(returnQuery){
                if(returnQuery.length >0){
                    returnQuery[0].imagem = "/images/products/"+returnQuery[0].id+".jpg";
                }
                res.render('product',{'content':returnQuery,'title':'Produto'});   
            });
        });
      

      
    });



    router.get('/categorie/:id', function(req, res, next) {
        var id = req.params.id;
        console.log(id);
        
        var s = `SELECT 
        			tb_comercio_produto_grupo1_sub.id, tb_comercio_produto_grupo1_sub.descricao
        		 FROM 
        		 	tb_comercio_produto,tb_comercio_produto_grupo1_sub
        		 WHERE 
        		 	tb_comercio_produto.id_grupo1 = `+ id + `
        		 	and tb_comercio_produto.id_grupo1_sub = tb_comercio_produto_grupo1_sub.id 
        		 GROUP BY 
        		 	tb_comercio_produto_grupo1_sub.id, tb_comercio_produto_grupo1_sub.descricao
    		 	 ORDER BY 
    		 	 	tb_comercio_produto_grupo1_sub.descricao DESC`;

     	var s2 = ` SELECT 
                * 
                FROM 
                dbo.tb_comercio_produto_grupo1 where id=`+id; 

    	var categoriesExcluded = [18];
    	var categoriesFinal = new Array();

        conn.connect(function(c){
        	c.select(s2,function(returnQuery){
        		
        		returnContent = {'title':returnQuery[0].descricao};

            	c.select(s,function(returnQuery2){
            		console.log(returnQuery2);
    		       	for (var i = returnQuery2.length - 1; i >= 0; i--) {
    		       		for (var j = categoriesExcluded.length - 1; j >= 0; j--) {
    		       			if(categoriesExcluded[j] != returnQuery2[i].id ){
                                returnQuery2[i].imagem = "/images/sub-categories/"+returnQuery2[i].id+".jpg";
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
        		
        		returnContent = {'title':returnQuery[0].descricao,'back':returnQuery[0].id_Grupo1};
            	c.select(s,function(returnQuery2){
            		//console.log(returnQuery2);
                    for (var i = returnQuery2.length - 1; i >= 0; i--) {
                        returnQuery2[i].imagem = "/images/products/"+returnQuery2[i].id+".jpg";
                    }; 
                    returnContent.products = returnQuery2;
            		res.render('sub-categories',returnContent);
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


  return router;
}


//module.exports = router;
