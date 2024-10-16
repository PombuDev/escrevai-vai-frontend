<template>
  <div class="background">
    <div class="lyrics-container">
      <h1 class="title">Escreva sua estrofe!</h1>
      
      <div class="player-info">
        <p class="current-player">Jogador: <strong>{{ currentPlayer.nickname }}</strong></p>
      </div>

      <div class="lyrics-input">
  <textarea 
    v-model="currentLyric" 
    :maxlength="maxCharacters" 
    placeholder="Digite sua estrofe aqui..." 
    class="lyric-textarea"
    :disabled="remainingStrophes <= 0" 
  ></textarea>
  <p class="character-count">{{ currentLyric.length }}/{{ maxCharacters }} caracteres</p>
  </div>

    <button 
      @click="submitLyric" 
      class="submit-btn" 
      :disabled="remainingStrophes <= 0"
    > 
     Enviar Estrofe
      </button>

      <div class="lyrics-list">
        <h3>Estrofes Escritas:</h3>
        <ul>
          <li v-for="(lyric, index) in lyrics" :key="index">{{ lyric }}</li>
        </ul>
      </div>

      <p class="remaining-strophes">Estrofes restantes: <strong>{{ remainingStrophes }}</strong></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    players: Array,
    nickname: String,
    isCreator: Boolean,
  },
  data() {
    return {
      currentLyric: '',
      lyrics: [],
      currentPlayerIndex: 0,
      maxCharacters: 150, // Limite de caracteres para cada estrofe
    };
  },
  computed: {
    currentPlayer() {
      return this.players[this.currentPlayerIndex];
    },
    totalStrophes() {
      return 4; // Total de estrofes para o jogo
    },
    remainingStrophes() {
      return this.totalStrophes - this.lyrics.length;
    }
  },
  methods: {
    submitLyric() {
      if (this.currentLyric.trim() === '') {
        alert('Você precisa escrever uma estrofe!');
        return;
      }
      
      this.lyrics.push(this.currentLyric);
      this.currentLyric = '';

      // Verifica se todas as estrofes foram escritas
      if (this.lyrics.length >= this.totalStrophes) {
        this.$emit('finish-song', this.lyrics); // Emitir evento para finalizar a música
      } else {
        // Avança para o próximo jogador
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      }
    }
  }
};
</script>

<style scoped>
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6;
  padding: 20px;
  box-sizing: border-box;
}

.lyrics-container {
  background-color: #7b1fa2;
  border-radius: 10px;
  padding: 30px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title {
  font-size: 26px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
}

.player-info {
  margin-bottom: 15px;
}

.current-player {
  font-size: 18px;
  color: #fff;
}

.lyrics-input {
  margin-bottom: 20px;
}

.lyric-textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 2px solid #7b1fa2;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
  box-sizing: border-box;
}

.lyric-textarea:disabled {
  background-color: #7b1fa2;
}

.character-count {
  text-align: right;
  font-size: 14px;
  color: #fff;
  margin-top: 5px;
}

.submit-btn {
  background-color: #c64d8a;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:disabled {
  background-color: #673ab7;
  cursor: not-allowed;
}

.submit-btn:hover:not(:disabled) {
  background-color: #c64d8a;
}

.lyrics-list {
  margin-top: 30px;
}

.lyrics-list h3 {
  font-size: 20px;
  color: #333333;
  margin-bottom: 10px;
}

.lyrics-list ul {
  list-style-type: none;
  padding: 0;
}

.lyrics-list li {
  font-size: 16px;
  color: #555555;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.remaining-strophes {
  font-size: 16px;
  color: #fff;
  margin-top: 20px;
}
</style>