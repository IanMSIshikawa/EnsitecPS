<template>
    <div id="app">
        <h1>Selecione qual categoria deseja Inserir</h1>
        <div class="button_container">
            <button> Produto </button>
            <button> Categoria </button>
            <button> Fornecedor </button>
        </div>
        
    </div>
</template>

<script>
export default {

}
</script>

<style>
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
</style>