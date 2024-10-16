<template>
  <div class="background">
    <div class="room-container">
      <h1 class="title">EscrevAI, vai!</h1>

      <div class="room-details">
        <!-- Exibe a lista de jogadores, com a coroa antes do criador da sala -->
        <div class="players">
          <h2>Jogadores:</h2>
          <ul>
            <li v-for="(player, index) in players" :key="index">
              <span v-if="player.isCreator">👑 </span>{{ player.nickname }}
            </li>
          </ul>
          <p>{{ playersCount }}/4 jogadores</p>
        </div>

        <!-- Exibe o ID da sala -->
        <div class="room-id">
          <h2>ID do Jogo:</h2>
          <p class="id">{{ roomId }}</p> <!-- Verificando se roomId está sendo passado -->
        </div>
      </div>

      <!-- Botões de ação, só o criador da sala vê o botão "Iniciar Jogo" -->
      <div class="actions">
        <button v-if="isCreator" @click="startGame" class="start-btn">Iniciar Jogo</button>
        <button @click="shareRoom" class="share-btn">Compartilhar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nickname: String, // Recebe o apelido passado do App.vue
    players: {
      type: Array,
      default: () => [] // Garante que players seja um array vazio por padrão
    },
    isCreator: {
      type: Boolean,
      default: false // Garante que isCreator seja falso por padrão
    },
    roomId: {
      type: String,
      required: true // O ID da sala deve ser passado como obrigatório
    },
  },
  data() {
    return {
      playersCount: this.players.length, // Conta os jogadores
    };
  },
  created() {
    console.log("ID da sala:", this.roomId); // Verifica se roomId está sendo passado
    console.log("Jogadores:", this.players); // Verifica se os jogadores estão sendo passados
  },
  methods: {
    startGame() {
      // Emite um evento para o componente pai (App.vue) informando que o jogo foi iniciado
      this.$emit("navigateToGenreSelection");
    },
    shareRoom() {
      // Copia o ID da sala para a área de transferência
      const shareText = `Entre na minha sala usando o ID: ${this.roomId}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert("ID da sala copiado para a área de transferência!");
      });
    }
  },
  watch: {
    players(newPlayers) {
      this.playersCount = newPlayers.length; // Atualiza a contagem de jogadores quando a lista muda
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

.room-container {
  background-color: #7b1fa2;
  padding: 30px;
  text-align: center;
  border-radius: 10px;
  color: #fff;
  width: 700px;
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

.room-details {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.players {
  background-color: #9c3d78;
  padding: 10px;
  border-radius: 10px;
  width: 45%;
}

.players h2,
.room-id h2 {
  font-size: 1.2rem;
}

.players ul {
  list-style-type: none;
  padding: 0;
}

.players li {
  font-size: 1rem;
  margin: 5px 0;
}

.players p {
  font-size: 0.9rem;
  color: #ddd;
}

.room-id {
  background-color: #9c3d78;
  padding: 10px;
  border-radius: 10px;
  width: 45%;
}

.id {
  font-size: 1.5rem;
  margin-top: 10px;
  background-color: #d14570;
  padding: 10px;
  border-radius: 5px;
}

.actions {
  margin-top: 20px;
}

.start-btn,
.share-btn {
  background-color: #5e2c51;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}

.start-btn:hover,
.share-btn:hover {
  background-color: #7e3a73;
}
</style>
