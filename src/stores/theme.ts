import {defineStore} from 'pinia';
import {ref, watch} from 'vue';

export const useThemeStore = defineStore('theme', () => {
    const theme = ref(localStorage.getItem('theme') || 'light');

    const toggleTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light';
    };

    // 监听变化，同步到 DOM 和本地存储
    watch(theme, (newTheme) => {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }, {immediate: true});

    return {theme, toggleTheme};
});