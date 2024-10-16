<template>
  <div class="background">
    <div class="genre-container">
      <h1 class="title">Escolha um gênero para a música</h1>

      <!-- Imagem da banda -->
      <div class="band-image">
        <img src="@/assets/banda.png" alt="Banda tocando" />
      </div>

      <!-- Campo de input para o gênero da música -->
      <div class="genre-input">
        <input
          type="text"
          v-model="chosenGenre"
          placeholder="ex: rock alternativo brasileiro dos anos 80"
          @focus="clearPlaceholder"
          class="genre-text"
        />
      </div>

      <!-- Botão de envio -->
      <button @click="submitGenre" class="submit-btn">Enviar Gênero</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chosenGenre: "", 
    };
  },
  methods: {
    submitGenre() {
      if (this.chosenGenre.trim()) {
        // Emite o evento para o App.vue para prosseguir com a navegação
        this.$emit("genre-chosen", this.chosenGenre);
      } else {
        alert("Por favor, insira um gênero.");
      }
    },
    clearPlaceholder(event) {
      event.target.placeholder = ""; 
    }
  }
};
</script>
  
  <style scoped>
  .background {
    background-color: #e1bee7; /* Fundo lilás rosa claro */
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .genre-container {
    background-color: #7b1fa2;
    padding: 30px;
    text-align: center;
    border-radius: 10px;
    color: #fff;
    width: 600px;
    margin: 0 auto;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  }
  
  .title {
    font-size: 2rem;
    background-color: #d14570;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  
  .band-image {
    margin-bottom: 20px;
  }
  
  .band-image img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
  
  .genre-input {
    margin-bottom: 20px;
  }
  
  .genre-text {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 1.2rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  .submit-btn {
    background-color: #5e2c51;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-btn:hover {
    background-color: #7e3a73;
  }
  </style>
  