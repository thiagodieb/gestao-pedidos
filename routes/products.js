var express = require('express');
var router = express.Router();
var conn = require('../models/connbd');
var utils = require('../lib/utils');

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



    router.get('/categorie/:id/mesa/:id_mesa', function(req, res, next) {
        var id = req.params.id;
        var id_mesa = req.params.id_mesa;
        req.session.mesa = {'id':id_mesa};
        console.log(id);
        
        var s = `SELECT 
        			tb_comercio_produto_grupo1_sub.id, tb_comercio_produto_grupo1_sub.descricao
        		 FROM 
        		 	tb_comercio_produto,tb_comercio_produto_grupo1_sub
        		 WHERE 
        		 	tb_comercio_produto.id_grupo1 = `+ id + `
        		 	and tb_comercio_produto.id_grupo1_sub = tb_comercio_produto_grupo1_sub.id 
        		 GROUP BY 
        		 	tb_comercio_produto_grupo1_sub.id, tb_comercio_produto_grupo1_sub.descricao`;

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
                    var newReturn = utils.checkKeys(returnQuery2,categoriesExcluded);
                    for (var i = newReturn.length - 1; i >= 0; i--) {
                            if(newReturn[i] != undefined){
                                newReturn[i].imagem = "/images/sub-categories/"+newReturn[i].id+".jpg";
                                categoriesFinal.unshift(newReturn[i]);
                            }
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

        var productsExcluded = [100,101,102,211,210,110,111,90,91,123];
        var productsFinal = new Array();

        conn.connect(function(c){
        	c.select(s2,function(returnQuery){
        		
        		returnContent = {'title':returnQuery[0].descricao,'msg':false};
            	c.select(s,function(returnQuery2){
                    var newReturn = utils.checkKeys(returnQuery2,productsExcluded);

                    for (var i = newReturn.length - 1; i >= 0; i--) {
                            if(newReturn[i] != undefined){
                                newReturn[i].imagem = "/images/products/"+newReturn[i].id+".jpg";
                                productsFinal.unshift(newReturn[i]);
                            }
                    };

                    returnContent.products = productsFinal;
                    //returnContent.mesa = req.session.mesa;
                    returnContent.mesa = {'id':8};
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
