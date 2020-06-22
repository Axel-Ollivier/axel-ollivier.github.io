const vm = new Vue({
  el: '#rick',
  data: {
    results: [],
    page_id: 1,
    selected_id: 0,
    selected: []
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh: function (event) {
      axios.get('https://rickandmortyapi.com/api/character/?page=' + this.page_id)
        .then(response => {
          this.results = response.data.results;
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_selected: function (value) {
      this.selected_id = value;
      axios.get('https://rickandmortyapi.com/api/character/' + this.selected_id)
        .then(response => {
          this.selected = response.data;
          this.selected.origin = response.data.origin.name;
          console.log(this.selected);
        })
        .catch(error => {
          console.log(error);
        });
    },
    prev: function (event) {
      if (this.page_id > 1) {
        this.page_id--;
        this.refresh();
      }
    },
    next: function (event) {
      this.page_id++;
      this.refresh();
    }
  }
});