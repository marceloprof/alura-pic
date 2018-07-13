<template>
  <div id="app">
    <h1 class="centralizado">{{ titulo }}</h1>
    <h2 v-show="mensagem" class="centralizado">{{mensagem}}</h2>
    <input type="search" @input="filtro = $event.target.value" class="filtro" placeholder="Digite a parte do título para filtrar"/>
    <ul class="lista-fotos">
      <li v-for="foto of fotosComFiltro" class="lista-fotos-item">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo" v-meu-transform:rotate.animate="90"></imagem-responsiva>
          <router-link :to="{name: 'altera', params: {id: foto._id}}"><meu-botao tipo="button" rotulo="Alterar"/></router-link>
          <meu-botao tipo="button" rotulo="Remover" estilo="perigo" @botaoAtivado="remover(foto)" :confirmacao="true"/>
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
  import Painel from '../shared/painel/Painel.vue'
  import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
  import Botao from '../shared/botao/Botao.vue'
  import transform from '../../directives/transform'
  import FotoService from '../../domains/FotoService'
  export default {
    components:{
      'meu-painel': Painel,
      'imagem-responsiva': ImagemResponsiva,
      'meu-botao': Botao
    },

    directives:{
      'meu-transform': transform
    },

    data () {
      return {
        titulo: 'Alurapic',
        fotos:[],
        filtro: '',
        mensagem: ''
      }
    },

    computed: {
      fotosComFiltro(){
        if(this.filtro){
          let exp = new RegExp(this.filtro.trim(), 'i');
          return this.fotos.filter(foto => exp.test(foto.titulo));
        }else{
          return this.fotos;
        }
      }
    },

    methods:{
      remover(foto){
          this.service.remover(foto._id)
            .then(
              () => {
                  let indice = this.fotos.indexOf(foto);
                  this.fotos.splice(indice, 1);
                  this.mensagem = 'Foto removida com sucesso!';
              },
              err => {
                  this.mensagem = err.message;
                  console.log(err);
              }
            )
      }
    },

    created(){
      this.service = new FotoService(this.$resource);
      this.service.listar()
        .then(fotos => this.fotos = fotos, err => this.mensagem = err.message);
    }
  }
</script>

<style lang="scss">
  .centralizado {
    text-align: center;
  }

  .lista-fotos {
    list-style: none;
  }

  .lista-fotos .lista-fotos-item {
    display: inline-block;
  }

  /* estilo do painel */

  .painel {
    padding: 0 auto;
    border: solid 2px grey;
    display: inline-block;
    margin: 5px;
    box-shadow: 5px 5px 10px grey;
    width: 200px;
    height: 100%;
    vertical-align: top;
    text-align: center;
  }

  .painel .painel-titulo {
    text-align: center;
    border: solid 2px;
    background: lightblue;
    margin: 0 0 15px 0;
    padding: 10px;
    text-transform: uppercase;
  }

  .filtro{
    display: block;
    width: 100%;
  }
</style>
