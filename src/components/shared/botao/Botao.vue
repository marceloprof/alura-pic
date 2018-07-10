<template>
  <button :type="tipo" class="botao" :class="estiloCustomizado" @click="disparaAcao()">{{rotulo}}</button>
</template>
<script>
  export default{
      props:{
          tipo: {
              required: true,
              type: String
          },
          rotulo:{
              required: true,
              type: String
          },
          estilo: String,
          confirmacao: Boolean
      },

      computed:{
          estiloCustomizado(){
              if(this.estilo === 'padrao' || !this.estilo){
                  return 'botao-padrao';
              }
              if(this.estilo === 'perigo'){
                  return 'botao-perigo';
              }
          }
      },
      methods:{
          disparaAcao(){
              if(this.confirmacao){
                if(confirm("Confirma a ação?")){
                  this.$emit('botaoAtivado');
                }
                return;
              }
              this.$emit('botaoAtivado');
          }
      }
  }

</script>
<style scoped>
  .botao {
    display: inline-block;
    padding: 10px;
    border-radius: 3px;
    margin: 10px;
    font-size: 1.2em;
  }

  .botao-perigo {
    background: firebrick;
    color: white;
  }

  .botao-padrao {
    background: darkcyan;
    color: white;
  }
</style>
