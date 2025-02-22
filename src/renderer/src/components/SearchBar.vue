<template>
  <v-sheet class="mx-auto pa-4 search-bar">
    <v-form @submit.prevent class="search-bar-form">
      <v-autocomplete
        @keyup.enter="addToQue"
        @update:search="handleSearchInput"
        label="查詢單字"
        :items="autoCompleteContent"
        v-model="selectedItem"
        prepend-inner-icon="mdi-magnify"
      ></v-autocomplete>
      <v-btn block color="secondary" elevation="2" @click="addToQue"> 加入貯列 </v-btn>
      <v-textarea label="單字貯列" v-model="searchQue" auto-grow></v-textarea>
      <v-btn class="mt-2" type="submit" @click="sendRequest" block color="primary" elevation="2">
        送出查詢
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import debounce from 'lodash/debounce';
import { mainStore } from '../store/main';
import { mapWritableState } from 'pinia';
import emitter from '../mitt';
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: '',
      autoCompleteContent: [],
      searchQue: ``,
      selectedItem: null
    };
  },
  computed: {
    ...mapWritableState(mainStore, ['searchResult'])
  },
  created() {
    // 使用 debounce 包裝 API 請求函數
    this.debouncedGetAutoCompleteContent = debounce(this.getAutoCompleteContent, 300);
  },
  methods: {
    async getAutoCompleteContent() {
      try {
        if (this.searchQuery.trim() === '') {
          this.autoCompleteContent = [];
          return;
        }
        const response = await window.api.dictionary.autoComplete(this.searchQuery);
        this.autoCompleteContent = response;
      } catch (error) {
        console.error('Error fetching auto complete content:', error);
      }
    },
    handleSearchInput(value) {
      this.searchQuery = value; // 即時更新 searchQuery
      this.debouncedGetAutoCompleteContent(); // 執行防抖函數
    },
    addToQue() {
      if (
        (this.selectedItem || this.searchQuery.trim()) &&
        !this.searchQue.includes(this.selectedItem || this.searchQuery)
      ) {
        this.searchQue += `${this.selectedItem || this.searchQuery}\n`;
        this.selectedItem = null; // 清空選定項目
        this.autoCompleteContent = []; // 清空建議內容
        this.searchQuery = ''; // 清空輸入框
      }
    },
    sendRequest() {
      let wordArray = this.searchQue.split('\n').filter((item) => item.trim() !== '');
      try {
        const response = window.api.dictionary.search(wordArray);
        this.searchResult = response;
        emitter.emit('searchResult', response);
      } catch (error) {
        console.error('Error fetching search content:', error);
      }
    }
  }
};
</script>

<style scoped lang="scss">
p {
  color: white;
}
.search-bar {
  height: 100% !important;

  .search-bar-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .v-textarea {
    max-height: 60vh;
    overflow: auto;
  }
}
</style>
