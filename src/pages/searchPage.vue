<template>
    <div id="app" class="container">
        <h1> {{ titulo }} </h1>
        <div class="select-container">
            <select v-model="typeOfSearch">
                <option disabled value="">Selecione uma opção</option>
                <option v-for="opcao in opcoes" :key="opcao" :value="opcao"> {{ opcao }}</option>
            </select>
            <input v-model="searchTerm" type="text">
        </div>
        <button @click="search(this.searchTerm, this.typeOfSearch, 1)"> Pesquisar </button>

        <div class="table-container">
            <dialogEdit
            :visible.sync="isDialogVisible"
            :tableVisible.sync="isTableVisible"
            :editProduct="editProduct"
            >
            </dialogEdit>
            <div v-if="isTableVisible">

                <table>
                    <thead>
                      <tr>
                        <th>ProdutoID</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Categoria</th>
                        <th>Fornecedor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="produto in produtos" :key="produto.ProdutoID">
                        <td>{{ produto.ProdutoID }}</td>
                        <td>{{ produto.ProdutoNome }}</td>
                        <td>{{ produto.Preco }}</td>
                        <td>{{ produto.Quantidade }}</td>
                        <td>{{ produto.CategoriaNome }}</td>
                        <td>{{ produto.FornecedorNome }}</td>
                        <td><button @click="deletar(produto.ProdutoID)"> Deletar </button></td>
                        <td><button @click="showDialog(produto)"> Editar </button></td>
                      </tr>
                    </tbody>
                  </table>

                  <div class="paginacao">
                    <button @click="pages(this.searchTerm, this.typeOfSearch, isNext=false)"> Pagina Anterior</button>
                    <button @click="pages(this.searchTerm, this.typeOfSearch, isNext=true)"> Proxima Pagina </button>
                  </div>

            </div>
        </div>
       

    </div>
</template>

<script>

import axios from 'axios'
import dialogEdit from './editDialog.vue';

export default {
    components:{
        dialogEdit
    },
    data() {
        return {
            titulo: 'Selecione qual o campo usado para a pesquisa de produtos',
            opcoes: ['ProdutoID', 'ProdutoNome', 'FornecedorNome'],
            searchTerm: '',
            typeOfSearch: '',
            produtos: [],
            isDialogVisible: false,
            isTableVisible: true,
            editProduct: {},
            page: 1
        };
    },
    methods: {
        showDialog(produto){
            this.editProduct = produto
            this.isTableVisible = false
            this.isDialogVisible=true
        },
        async search (term, type, page) {
            try {
                const response = await axios.get(`http://localhost:4000/search/${type}/${term}/${page}`)
                const data = response.data
                console.debug(data)
                this.produtos = data
                this.isTableVisible = true
                this.isDialogVisible = false
            } catch (error) {
                console.error('Erro ao pesquisar', error)
            }
        },
        async deletar (productID){
            try {
                await axios.delete(`http://localhost:4000/delete/${productID}`)
                this.search(this.searchTerm, this.typeOfSearch)
            } catch (error) {
                console.error('Erro ao deletar', error)
            }
        },
        async pages (term, type, isNext) {
            if (isNext){
                this.page ++
            }
            else{
                if(this.page > 1){
                    this.page --
                }
            }
            const page = this.page
            try {
                const response = await axios.get(`http://localhost:4000/search/${type}/${term}/${page}`)
                const data = response.data
                console.debug(data)
                this.produtos = data
                this.isTableVisible = true
                this.isDialogVisible = false
            } catch (error) {
                console.error('Erro ao pesquisar', error)
            }
        }
    }
};
</script>

<style>
.table-container {
    th{
        margin-left: 20px;
        margin-right: 20px;
    }
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
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
    margin-bottom: 20px;
    scale: 1.2;
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
  td, tr {
    scale: 1.2;
    padding: 20px
  }
  
</style>