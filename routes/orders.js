var express = require('express');
var router = express.Router();
var conn = require('../models/connbd');


module.exports = function(security) {
        
    //router.get('/table/:id',security, function(req, res, next) {
    router.get('/table/:id', function(req, res, next) {
        var id = req.params.id;
        console.log(id);
        
        var s = ` 
                SELECT 
                    id,IdItemPai,id_relacional,id_vendedor,relacional_tipo,relacional_nome,dataPedido,id_produto,quantidade,quantidadeUnica,vl_unitario,vl_total,vl_desconto_unitario,vl_desconto_total,vl_imp_icms,vl_imp_ipi,vl_imp_iss,aliq_imp_icms,aliq_imp_ipi,aliq_imp_iss,pdv_id,pdv_ordem,pdv_cod_imp,produto_cod,produto_descritivo,produto_unidade,icone,id_imp_fiscal,deletado,preco_compra,pago,complemento,meio,posicao,usaQtdFracionada,composicaoTipo,selecionaveis,enviadoSetor,coo_demonstrativo,transferido,transferido_origem,pdv_cod_imp_sintegra,isTarifa,descontoGeral,idDesconto,isFidelidade,DescImpFiscal,idSaidaItemCancelado,CodigoTotalizadorParcial,IdKit,IdKitControle,QtdKit,QtdItemPorKit,IsKitGRN,IdComposicao,isBrinde,idTarifaPedido,permiteAgregarValorAoItemPai,nomeCliente,cer_demonstrativo,isAbertoUcResumo,vl_desconto_unitario_original,vl_desconto_final,isSeguro,IdCor,IdTamanho,IdPedidoItemComercio,IdPedidoComercio,DescricaoCor,DescricaoTamanho,isBrindePromocao,ItemImpresso,id_usuario_autorizacao_desconto,ImprimeRetirada,CodigoBarras,percentualAproximadoImposto,SenhaSequencial,isSugestaoPDV,tarifaDelivery,CFOP,ObservacaoCliente,ccf_venda_tef,vl_desconto_brinde,cod_enquadramento_ipi,cod_classe_enquadramento_ipi,hash_PAF,JaFoiVendido,quantidade_estoque,data_entrega,ImprimeCupomTroca 
                FROM 
                    tb_pdv_pedido_itens
                WHERE
                    composicaoTipo = 0 AND
                    id_relacional =`+id;

        conn.connect(function(c){
        	c.select(s,function(returnQuery){
                mesa = {'id':id,'nome':'Mesa '+id};
        		res.render('order',{'content':returnQuery,'title':mesa.nome,'mesa':mesa}); 
            });
        });
      
    });


    router.get('/sub-categorie/:id',security, function(req, res, next) {
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



    router.get('/product/:id',security, function(req, res, next) {
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
