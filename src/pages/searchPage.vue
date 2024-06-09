<template>
    <div id="app" class="container">
        <h1> {{ titulo }} </h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            titulo: 'Teste'
        };
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