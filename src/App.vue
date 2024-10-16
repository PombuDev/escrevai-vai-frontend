<template>
  <div>
    <!-- Primeira tela (Criação ou entrada em sala) -->
    <div v-if="!roomCreated && !genreSelectionVisible && !lyricsWritingVisible && !resultsVisible" class="background">
      <div class="container">
        <header>
          <h1 class="title">EscrevAI, vai!</h1>
        </header>

        <div class="content">
          <div class="profile">
            <div class="avatar-container">
              <img src="@/assets/avatar.png" alt="Avatar do usuário" class="avatar">
              <span class="nickname-label">Apelido</span>
            </div>
            <input type="text" v-model="nickname" placeholder="Digite seu apelido" class="nickname-input" />
          </div>

          <div class="rules-container">
            <h2>Como jogar?</h2>
            <ul>
              <li v-for="(rule, index) in rules" :key="index">{{ rule }}</li>
            </ul>
            <input type="text" v-model="newRule" placeholder="Adicionar nova regra" class="rule-input" />
            <button @click="addRule" class="add-rule-btn">Adicionar Regra</button>
          </div>
        </div>

        <div class="actions">
          <button @click="createRoom" class="create-room">Criar Sala</button>
          <div class="join-room">
            <input type="text" v-model="roomCode" placeholder="Código da sala" class="join-room-input" />
            <button @click="joinRoom">Entrar na sala</button>
          </div>
        </div>
      </div>
    </div>

    <RoomView 
      v-if="roomCreated && !genreSelectionVisible && !lyricsWritingVisible && !resultsVisible" 
      :nickname="nickname" 
      :isCreator="isCreator" 
      :roomId="generatedRoomId" 
      :players="players" 
      @navigateToGenreSelection="showGenreSelection"
    />

    <GenreSelection 
      v-if="genreSelectionVisible && !lyricsWritingVisible && !resultsVisible" 
      @genre-chosen="handleGenreChosen"
    />

    <LyricWritingView 
      v-if="lyricsWritingVisible && !resultsVisible" 
      :players="players" 
      :nickname="nickname" 
      :isCreator="isCreator"
      @finish-song="finishSong" 
    />

    <!-- Tela ResultsSound após a escrita da letra -->
    <ResultsSound 
      v-if="resultsVisible" 
      :players="players" 
      :completedLyrics="completedLyrics" 
      @restart-game="restartGame"
    />
  </div>
</template>

<script>
import RoomView from './components/RoomView.vue'; 
import GenreSelection from './components/GenreSelection.vue'; 
import LyricWritingView from './components/LyricWritingView.vue'; 
import ResultsSound from './components/ResultsSound.vue'; // Importando ResultsSound

export default {
  components: {
    RoomView,
    GenreSelection,
    LyricWritingView,
    ResultsSound // Registrando o componente
  },
  data() {
    return {
      nickname: '',
      newRule: '',
      rules: ['Escreva um verso por vez', 'Escolha um ritmo', 'Divirta-se!'], 
      roomCode: '',
      roomCreated: false, 
      isCreator: false, 
      generatedRoomId: '', 
      players: [], 
      genreSelectionVisible: false, 
      lyricsWritingVisible: false,
      resultsVisible: false, 
      completedLyrics: [] 
    };
  },
  methods: {
    createRoom() {
      if (this.nickname) {
        this.isCreator = true;
        this.generatedRoomId = Math.random().toString(36).substr(2, 8).toUpperCase();
        this.players.push({ nickname: this.nickname, isCreator: true });
        this.roomCreated = true; 
      } else {
        alert('Por favor, insira seu apelido para criar uma sala.');
      }
    },
    joinRoom() {
      if (this.nickname && this.roomCode) {
        this.isCreator = false;
        this.generatedRoomId = this.roomCode;
        this.players.push({ nickname: this.nickname, isCreator: false });
        this.roomCreated = true; 
      } else {
        alert('Por favor, insira seu apelido e o código da sala.');
      }
    },
    addRule() {
      if (this.newRule) {
        this.rules.push(this.newRule);
        this.newRule = ''; 
      }
    },
    showGenreSelection() {
      this.genreSelectionVisible = true;
    },
    handleGenreChosen(chosenGenre) {
      this.genreSelectionVisible = false;
      this.lyricsWritingVisible = true;
      console.log('Gênero escolhido:', chosenGenre);
    },
    finishSong(lyricsList) {
      console.log('Letra completa:', lyricsList);
      this.completedLyrics = lyricsList; 
      this.lyricsWritingVisible = false; 
      this.resultsVisible = true; 
    },
    restartGame() {
      this.nickname = '';
      this.newRule = '';
      this.rules = ['Escreva um verso por vez', 'Escolha um ritmo', 'Divirta-se!'];
      this.roomCode = '';
      this.roomCreated = false;
      this.isCreator = false;
      this.generatedRoomId = '';
      this.players = [];
      this.genreSelectionVisible = false;
      this.lyricsWritingVisible = false;
      this.resultsVisible = false; 
      this.completedLyrics = []; 
    }
  }
};
</script>

<style scoped>
.background {
  background-color: #e1bee7; 
  min-height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px; 
}

.container {
  background-color: #7b1fa2;
  padding: 30px;
  text-align: center;
  border-radius: 10px;
  color: #fff;
  width: 90%; 
  max-width: 700px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 2.5rem;
  background-color: #d14570;
  padding: 15px;
  border-radius: 10px;
}

.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  margin: 20px 0;
}

.profile, .rules-container {
  flex: 1 1 45%;
  text-align: left;
}

.avatar-container {
  position: relative;
  margin-bottom: 15px;
}

.avatar {
  border-radius: 50%;
  width: 120px;
  height: 120px;
}

.nickname-label {
  position: absolute;
  top: 5px;
  left: 5px;
  background-color: #c64d8a;
  color: #fff;
  padding: 3px 6px;
  font-size: 0.8rem;
  border-radius: 5px;
}

.nickname-input {
  display: block;
  margin-top: 10px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #eee;
  width: 100%;
}

.rules-container {
  background-color: #9c3d78;
  padding: 15px;
  border-radius: 10px;
}

.rules-container h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.rule-input {
  padding: 8px;
  margin-top: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.add-rule-btn {
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #c64d8a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.actions {
  margin-top: 20px;
}

.create-room, .join-room button {
  padding: 10px 15px;
  margin-top: 10px;
  background-color: #c64d8a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.join-room {
  display: flex;
  align-items: center;
  justify-content: center;
}

.join-room-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
}

.results-container {
  text-align: center;
  background-color: #673ab7;
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
  background-color: #673ab7;
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
</style>