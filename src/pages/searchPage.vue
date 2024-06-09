<template>
    <div id="app" class="container">
        <h1> {{ titulo }} </h1>
        <div class="select-container">
            <select v-model="typeOfSearch">//alterar para a senha do seu usuário 
                <option disabled value="">Selecione uma opção</option>
                <option v-for="opcao in opcoes" :key="opcao" :value="opcao"> {{ opcao }}</option>
            </select>
            <input v-model="searchTerm" type="text">
            </div>
        <button @click="search(this.searchTerm, this.typeOfSearch)"> Pesquisar </button>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            titulo: 'Selecione qual o campo usado para a pesquisa de produtos',
            opcoes: ['ProdutoID', 'ProdutoNome'],
            searchTerm: '',
            typeOfSearch: ''
        };
    },
    methods: {
        async search (term, type) {
            try {
                const response = await axios.get(`http://localhost:4000/search/${type}/${term}`)
                const data = response.data
                console.debug(data)
            } catch (error) {
                console.error('Erro ao pesquisar', error)
            }
    }
    }
};
</script>

<style>
.select-container {
    background-color: #181818;
    border: 0cap;
    color: rgba(235, 235, 235, 0.64);
    scale: 1.5;
    margin-bottom: 20px;
    select {
        background-color: #181818;
        border: 0cap;
        color: rgba(235, 235, 235, 0.64);
    };
    input {
        background-color: #282828;
        border: 0cap;
        color: rgba(235, 235, 235, 0.64);
        border-radius: 4px;
    }    
}
button {
    margin-left: 20px;
    margin-right: 20px;
    scale: 1.5;
    background-color:#282828;
    border-radius: 4px; 
    border-color: #282828;
    color: rgba(235, 235, 235, 0.64);
}
.container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    text-align: center;
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