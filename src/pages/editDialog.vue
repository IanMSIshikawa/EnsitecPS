<template>
    <div v-if="isVisible" class="dialog">
        <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>CategoriaID</th>
                <th>FornecedorID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="text" v-model="editProduct.ProdutoNome"></td>
                <td><input type="text" v-model="editProduct.Preco"></td>
                <td><input type="text" v-model="editProduct.Quantidade"></td>
                <td><input type="text" v-model="editProduct.CategoriaID"></td>
                <td><input type="text" v-model="editProduct.FornecedorID"></td>
                
              </tr>
            </tbody>
          </table>
          <button @click="saveProduct(this.editProduct.ProdutoID)"> Salvar </button>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    props:{
        visible:{
            type: Boolean,
            default: false
        },
        editProduct:{
            type: Object,
            required: true
        },
        tableVisible:{
            type: Boolean,
            default: true
        }
    },
    watch: {
        visible(newVal) {
            this.isVisible = newVal;
        }
    },
    methods: {
        async closeDialog() {
            this.isVisible = false;
            this.isTableVisible = true;
            this.$emit('update:visible', false);
            this.$emit('update:tableVisible', true);
        },
        async saveProduct(productID) {
            try {
                await axios.put(`http://localhost:4000/update/product/${productID}`, { ProdutoNome: this.editProduct.ProdutoNome, Preco: this.editProduct.Preco, 
                      Quantidade: this.editProduct.Quantidade, CategoriaID: this.editProduct.CategoriaID, FornecedorID: this.editProduct.FornecedorID })
            } catch (error) {
                console.error('Erro ao editar produto:', error.response ? error.response.data : error.message)
            }
            this.closeDialog()
        }

        
    },
    data(){
        return{
            currentProduct: this.editProduct,
            isVisible: this.visible,
            isTableVisible: this.tableVisible,
            categoriaID: '',
            FornecedorID: ''

        }
    },

}

</script>

<style>
</style>