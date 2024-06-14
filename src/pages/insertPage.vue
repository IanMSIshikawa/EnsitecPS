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
                        <th v-for="col in columns" :key="col" :value="col" > {{ col }} </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td  v-for="col in columns" :key="col" :value="col" >
                            <input type="text" v-model="formData[col]" :placeholder="`Preencha ${col}`" >
                        </td>
                    </tr>
                </tbody>
            </table>
            <button @click="insert(typeOfSearch, formData)"> Inserir </button>
            <p> {{ formData }} </p>
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
            formData:{}
        };
    }, 
    methods: {
        async getColumns (table) {
            try {
                const response = await axios.get(`http://localhost:4000/get/columns/${table}`)
                const data = response.data
                this.columns = data.slice(1)
            } catch (error) {
                console.error('Erro ao pesquisar', error)
            }
        },
        async insert(type, dados) {
            try {
                console.debug(dados)
                await axios.post(`http://localhost:4000/insert/${type}`, dados )
                console.log('inserido com sucesso')
            } catch (error) {
                console.error('Erro ao inserir', error)
            }
        }

    }
};
</script>

<style>

.table{
    scale: 1.2;
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
input, button{
    background-color: #282828;
    color:  rgba(235, 235, 235, 0.64);
    border: 0cap;
    border-radius: 4px;
}



</style>