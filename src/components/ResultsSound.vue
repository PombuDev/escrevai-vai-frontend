<template>
  <div class="results-container">
    <h1>Resultados da Música</h1>

    <!-- Capa do álbum -->
    <img src="@/assets/album.png" alt="Capa do Álbum" class="album-cover" />

    <!-- Exibição dos jogadores -->
    <h2>Jogadores:</h2>
    <ul>
      <li v-for="(player, index) in players" :key="index">{{ player.nickname }}</li>
    </ul>

    <!-- Exibição da letra da música -->
    <div class="lyrics">
      <h2>Letra da Música:</h2>
      <div v-for="(lyric, index) in completedLyrics" :key="index" class="lyric-item">
        <p>{{ lyric }}</p>
      </div>
    </div>

    <!-- Player de áudio com controles -->
    <audio :src="require('@/assets/som.mp3')" controls preload="auto" class="audio-player"></audio>

    <button @click="restartGame" class="restart-button">Jogar Novamente</button>
  </div>
</template>

<script>
export default {
  props: {
    players: Array,
    completedLyrics: Array
  },
  methods: {
    restartGame() {
      this.$emit('restart-game'); // Emitir evento para reiniciar o jogo
    }
  }
};
</script>

<style scoped>
.results-container {
  text-align: center;
  background-color: #7b1fa2;
  padding: 20px;
  border-radius: 10px;
  color: white;
}

.album-cover {
  width: 200px;
  height: auto;
  margin-bottom: 20px;
}

.lyrics {
  background-color: #fff;
  color: #000;
  padding: 15px;
  border-radius: 10px;
  margin: 20px 0;
}

.lyric-item {
  margin: 5px 0;
}

.lyric-item p {
  margin: 0;
}

.audio-player {
  width: 100%;
  margin-top: 20px;
}

.restart-button {
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #c64d8a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>