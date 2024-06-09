<template>
    <div id="app" class="container">
        <h1>{{ titulo }}</h1>
        <p> Pesquise, edite, insira ou delete produtos do estoque <br>
            Selecione uma das opções abaixo para prosseguir
        </p>
        <div class="button_container">
          <button @click="goToSearch"> {{ botoes[0] }} </button>
          <button> {{ botoes[1] }} </button>
          <button> {{ botoes[2] }} </button>
          <button> {{ botoes[3] }} </button>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      titulo: 'Estoque fácil',
      botoes: ['Pesquisar', 'Editar', 'Inserir', 'Deletar']
    };
  },
  methods: {
    goToSearch: function() {
      this.$router.push({name: 'searchPage'})
    }
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.button_container button{
  text-align: center;
  margin-top: 40px;
  margin-left: 20px;
  margin-right: 20px;
  background-color:#282828;
  border-radius: 4px; 
  border-color: #282828;
  color: rgba(235, 235, 235, 0.64);
  scale: 1.5;
}

h1 {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}

p {
  margin-top: 20px;
  font-size: 18px;
}
</style>