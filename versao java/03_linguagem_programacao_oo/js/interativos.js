
var FXManager = {
    snd_certo : new Audio("objetos/snd/acerto.mp3"),
    snd_erro : new Audio("objetos/snd/erro.mp3"),
    snd_aplauso : new Audio("objetos/snd/aplauso.mp3"),
}

function Checker(el){
    var c = $(el).parent().parent().find('.certo').not('.bt-alts, .bt-res');
    var e = $(el).parent().parent().find('.enunciado');
    console.log("parent= ",$(el).parent().parent());
    console.log('enunciados=',e.length)
    console.log('certos=', c.length)
    if(c.length == e.length){
        console.log('terminou');
        FXManager.snd_aplauso.play();
    }
}


var Atividadeselect = {
    init:function(classname){
        console.log('init - '+ classname);
        $('.'+classname).parent().before('<p class="enunciado sr-only" aria-hidden="true">para resolver o problema do audio no caso do select</p>')
       
        $('.'+classname).on('change', function(){
            $(this).parent().removeClass('certo');
            $(this).parent().removeClass('errado');
            console.log('selected = ',$(this).val());
            console.log('default =',$(this).data("def"));
            if($(this).val() == $(this).data("def")){
                $(this).parent().addClass('certo');
                FXManager.snd_certo.play();
                if($(".ol-"+classname+" li.certo").length == 3)
                    Checker($('.'+classname).eq(0));//FXManager.snd_aplauso.play();                
            }else{
                $(this).parent().addClass('errado')/
                    FXManager.snd_erro.play();
            }
        })
    }
}

/**
 *Bem simples, coloca a classe esquemaDaBru no container, e alt-c na alternativa certa ,
  alt-e na alternativa errada
 */


var EsquemaDaBru = {
    init: function(){
        console.log('Esquema init')
        eb = this;
        $(".esquemaDaBru .alt-e").on('click', function(){           
            eb.clear(this);
            $(this).addClass('errado');
            FXManager.snd_erro.play();
            
        })
        $(".esquemaDaBru .alt-c").on('click', function(){            
            eb.clear(this);
            $(this).addClass('certo');
            FXManager.snd_certo.play();
            eb.check(this);
           
        })
        //acessibilidade
        $('.enunciado').attr('tabindex',0);
        //$('.enunciado').attr('role','dialog');
        $('.esquemaDaBru .alt-c,.esquemaDaBru .alt-e').attr('title','alternativa: ')
       

    },
    clear: function(el){      
        $(el).parent().find('.alt-c').removeClass('certo');
        $(el).parent().find('.alt-e').removeClass('errado');
    },
    check: function(el){
        console.log('check')
        if($(el).parent().parent().find('.esquemaDaBru .certo').length == $(el).parent().parent().find('.esquemaDaBru').length){
            Checker(el);
        }
    }
}


var MultiSelect = {
    alternatives: null,
    init: function (classname){
        console.log('initi - ', classname)
        ms = this,
        $("."+classname+'.multiSelect .alt-e').on('click', function(){
            $(this).addClass('errado');
            FXManager.snd_erro.play();
            
        });
        $("."+classname+'.multiSelect .alt-c').on('click', function(){
            //ms.clear(this);
            $(this).addClass('certo');
            FXManager.snd_certo.play();
            if($("."+classname+'.multiSelect .alt-c').length == $("."+classname+'.multiSelect .alt-c.certo').length){
                FXManager.snd_aplauso.play();
            }
        });

    },
    clear: function(el){ 
        $(el).parent().find('.alt-e').removeClass('errado');
    }
}

$(document).ready(function(){
    Atividadeselect.init('interativa01');
    MultiSelect.init('multi01');
    EsquemaDaBru.init()
})