var config = {
  server: 'https://learnalist.net/api',
  headers: {
    'Authorization': 'Basic FAKE'
  },
  renderScreen: 'lists',
};

new Vue({
  el: '#app',
  data: {
    aList: null,
    manyLists: [],
    renderScreen: '',
    server: '',
  },
  methods: {
    openOptions() {
      chrome.runtime.openOptionsPage();
    },
    loadOptions() {
      let basicAuth = localStorage.getItem('basicAuth');
      if (basicAuth) {
        config.headers.Authorization = 'Basic ' + basicAuth;
      } else {
        console.log('setoptions');
        this.renderScreen = 'setoptions';
        return;
      }

      let server = localStorage.getItem('server');
      if (server) {
        config.server = server;
      }

      let screen = localStorage.getItem('renderScreen');
      if (screen) {
        this.renderScreen = screen;
      }

      let aList = localStorage.getItem('aList');
      if (aList) {
        this.aList = JSON.parse(aList);
      }
    },
    setRenderScreen(screen) {
      this.renderScreen = screen;
      localStorage.setItem('renderScreen', screen);
    },
    setAlist(aList) {
      if (aList) {
        localStorage.setItem('aList', JSON.stringify(aList));
      } else {
        localStorage.removeItem('aList');
      }
      this.aList = aList;
    },
    showScreenLists() {
      this.setAlist(null);
      this.setRenderScreen('lists');
      this.getMyLists();
    },
    showScreenView(aList, event) {
      this.setAlist(aList);
      this.setRenderScreen('alist:view:' + this.aList.info.type);
    },
    showScreenListEdit() {
      this.setRenderScreen('alist:edit:' + this.aList.info.type);
    },
    showScreenAddList() {
      this.setRenderScreen('alist:new');
    },
    addNewList(event) {
      title = event.target.form.elements[0].value;
      listType = event.target.form.elements[1].value;
      aList = {
        "data":[],
        "info":{
          "title": title,
          "type": listType
        }
      }

      this.setAlist(aList);
      this.postList();
    },
    saveListV1(aList) {
      this.putList();
    },
    saveListV2(aList) {
      this.putList();
    },
    updateListItemV1(index, original, event) {
      if (this.aList.info.type === 'v1') {
        item = event.target.value;
        if (item != "") {
          this.aList.data[index] = item;
        } else {
          this.aList.data.splice(index, 1);
        }
        this.setAlist(this.aList);
      }
    },
    updateListItemV2(index, original, event) {
      if (this.aList.info.type === 'v2') {
        which = event.target.attributes['data-which'].value;
        item = event.target.value;
        pair = this.aList.data[index];
        pair[which] = item;
        if (pair.from === '' && pair.to === '') {
          this.aList.data.splice(index, 1);
        } else {
          this.aList.data[index] = pair;
        }
        this.setAlist(this.aList);
      }
    },
    addListItemV1(event) {
      var inputs = event.target.form.querySelectorAll('[type="text"]');
      item = inputs[0].value;

      if (item !== '') {
        this.aList.data.push(item);
        event.target.form.reset();
        this.setAlist(this.aList);
      }
    },
    addListItemV2(event) {
      var inputs = event.target.form.querySelectorAll('[data-which]');
      pair = {
        from: inputs[0].value,
        to: inputs[1].value
      };

      if (pair.from !== '' || pair.to !== '') {
        this.aList.data.push(pair);
        event.target.form.reset();
        this.setAlist(this.aList);
      }
    },
    getMyLists() {
      url = config.server + '/alist/by/me';
      fetch(url,{
        headers: {
          'Authorization': config.headers.Authorization
        }
      })
      .then(response => response.json())
      .then(data => {
        this.manyLists = data;
        this.setAlist(null);
        this.setRenderScreen('lists');
      })
      .catch(error => console.error(error))
    },
    postList() {
      url = config.server + '/alist';
      data = this.aList;
      fetch(url, {
        method: "POST",
        headers: {
            'Authorization': config.headers.Authorization,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        this.setAlist(data);
        this.setRenderScreen('alist:edit:' + this.aList.info.type);
      });
    },
    putList() {
      url = config.server + '/alist/' + this.aList.uuid;
      data = this.aList;
      fetch(url, {
        method: "PUT",
        headers: {
            'Authorization': config.headers.Authorization,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        this.showScreenLists();
      });
    },
    deleteList() {
      url = config.server + '/alist/' + this.aList.uuid;
      fetch(url,{
        method: "DELETE",
        headers: {
          'Authorization': config.headers.Authorization,
        }
      })
      .then(response => {
        this.showScreenLists();
      })
      .catch(error => console.error(error))
    }
  },
  created: function () {
    chrome.tabs.getSelected(null, tab => {
      this.loadOptions();
    });
  }
});
