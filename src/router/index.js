import { createRouter, createWebHistory } from 'vue-router';
import GenreSelection from '../components/GenreSelection.vue';
import LyricWritingView from '../components/LyricWritingView.vue';

const routes = [
  {
    path: '/genre-selection',
    name: 'GenreSelection',
    component: GenreSelection,
  },
  {
    path: '/lyrics-writing/:roomId',
    name: 'LyricsWriting',
    component: LyricWritingView,
    props: true, // Permite passar as props da rota para o componente
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;