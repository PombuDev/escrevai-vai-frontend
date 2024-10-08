<template>
  <div v-if="!roomCreated" class="background">
    <div class="container">
      <header>
        <h1 class="title">EscrevAI, vai!</h1>
      </header>
      
      <div class="content">
        <!-- Seção da foto e apelido -->
        <div class="profile">
          <div class="avatar-container">
            <img src="@/assets/avatar.png" alt="Avatar do usuário" class="avatar">
            <span class="nickname-label">Apelido</span>
          </div>
          <input type="text" v-model="nickname" placeholder="Digite seu apelido" class="nickname-input" />
        </div>

        <!-- Seção das regras -->
        <div class="rules-container">
          <h2>Como jogar?</h2>
          <ul>
            <li v-for="(rule, index) in rules" :key="index">{{ rule }}</li>
          </ul>
          <input type="text" v-model="newRule" placeholder="Adicionar nova regra" class="rule-input" />
          <button @click="addRule" class="add-rule-btn">Adicionar Regra</button>
        </div>
      </div>

      <!-- Botões para criar ou entrar em uma sala -->
      <div class="actions">
        <button @click="createRoom" class="create-room">Criar Sala</button>
        <div class="join-room">
          <input type="text" v-model="roomCode" placeholder="Código da sala" class="join-room-input" />
          <button @click="joinRoom">Entrar na sala</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Tela RoomView após a criação ou entrada na sala -->
  <RoomView v-if="roomCreated" :nickname="nickname" :isCreator="isCreator" :roomId="generatedRoomId" :players="players" />
</template>

<script>
import RoomView from './components/RoomView.vue'; // Importando RoomView

export default {
  components: {
    RoomView
  },
  data() {
    return {
      nickname: '',
      newRule: '',
      rules: ['Escreva um verso por vez', 'Escolha um ritmo', 'Divirta-se!'], // Regras padrão
      roomCode: '',
      roomCreated: false, // Controle para mostrar a tela RoomView
      isCreator: false, // Verifica se o usuário criou a sala
      generatedRoomId: '', // ID gerado automaticamente para a sala
      players: [] // Lista de jogadores
    };
  },
  methods: {
    createRoom() {
      if (this.nickname) {
        this.isCreator = true;
        this.generatedRoomId = Math.random().toString(36).substr(2, 8).toUpperCase();
        this.players.push({ nickname: this.nickname, isCreator: true }); // Adiciona o criador à lista de jogadores
        this.roomCreated = true; // Navega para a RoomView após criar a sala
      } else {
        alert('Por favor, insira seu apelido para criar uma sala.');
      }
    },
    joinRoom() {
      if (this.nickname && this.roomCode) {
        this.isCreator = false;
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
  background-color: #5e2c51;
  color: white;
  padding: 10px;
  margin-top: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-rule-btn:hover {
  background-color: #7e3a73;
}

.actions {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 20px;
}

.create-room, .join-room button {
  background-color: #5e2c51;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.create-room:hover, .join-room button:hover {
  background-color: #7e3a73;
}

.join-room {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.join-room-input {
  width: 100px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-right: 10px;
}
</style>
