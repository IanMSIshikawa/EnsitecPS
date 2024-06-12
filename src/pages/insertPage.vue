<template>
    <div id="app" class="container">
        <h1>Selecione qual categoria deseja Inserir</h1>
        <div class="select-container">
            <select v-model="typeOfSearch">
                <option disabled value="">Selecione uma opção</option>
                <option v-for="opcao in opcoes" :key="opcao" :value="opcao"> {{ opcao }}</option>
                </select>
            <button @click="getColumns(typeOfSearch)">Selecionar</button>
        </div>

        <div class="tabela">
            <table>
                <thead>
                    <tr>
                        <th v-for="col in columns" :key="col" :value="col"> {{ col }} </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td  v-for="col in columns" :key="col" :value="col">
                            <input type="text" v-model="formData[col]" :placeholder="`Preencha ${col}`" >
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return{
            typeOfSearch: '',
            opcoes: ['Produtos', 'Fornecedores', 'Categorias'],
            columns: [],
            formData:[]
        };
    }, 
    methods: {
        async getColumns (table) {
            try {
                const response = await axios.get(`http://localhost:4000/get/columns/${table}`)
                const data = response.data
                console.debug(data)
                this.columns = data
            } catch (error) {
                console.error('Erro ao pesquisar', error)
            }
        }
    }
};
</script>

<style>

.colunas{
    display: flex;
    flex-direction: row;
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
}
.container{
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



</style>