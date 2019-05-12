import { writable } from "svelte/store";
import { api } from "../api.js";

function create() {
  const { subscribe, set, update } = writable();

  return {
    subscribe,
    set,
    create: async function(title, listType) {
      let current = {
        data: [],
        info: {
          title: title,
          type: listType,
          labels: []
        }
      };
      update(aList => {
        aList = current;
        return aList;
      });
      try {
        let response = await api.PostList(current);
        if (response.status === 201) {
          let serverList = response.body;
          // TODO fix this on the server.
          serverList.info.labels = [];
          response.body = serverList;
          set(serverList);
          localStorage.setItem("aList", JSON.stringify(serverList));
          return response;
        } else {
          return response;
        }
      } catch (error) {
        console.log(error);
        return {
          status: "clientfail",
          body: {
            message: "Failed to post to the server."
          }
        };
      }
    },
    delete: async function() {
      let current;
      update(aList => {
        current = aList;
        return aList;
      });

      try {
        let response = await api.DeleteList(current);
        if (response.status === 200) {
          set({});
          localStorage.removeItem("aList");
          return response;
        } else {
          return response;
        }
      } catch (error) {
        console.log(error);
        return {
          status: "clientfail",
          body: {
            message: "Failed to delete from the server."
          }
        };
      }
    },
    save: async function() {
      let current;
      let a = update(aList => {
        current = aList;
        return aList;
      });

      try {
        let response = await api.PutList(current);
        if (response.status === 200) {
          update(function(aList) {
            aList = response.body;
            return aList;
          });
          // TODO fix this on the server.
          response.body.info.labels = [];
          localStorage.setItem("aList", JSON.stringify(response.body));
          return "Saved to the server.";
        } else {
          return response.body.message;
        }
      } catch (error) {
        console.log(error);
        return "Failed to save to the server.";
      }
    },
    setTitle: function(title) {
      update(function(aList) {
        aList.info.title = title;
        return aList;
      });
    },
    addItem: function(item) {
      update(function(aList) {
        aList.data.push(item);
        return aList;
      });
    },
    removeItem: function(index) {
      update(function(aList) {
        aList.data.splice(index, 1);
        return aList;
      });
    },
    addLabel: function(label) {
      update(function(aList) {
        aList.info.labels.push(label);
        return aList;
      });
    },
    removeLabel: function(index) {
      update(function(aList) {
        aList.info.labels.splice(index, 1);
        return aList;
      });
    }
  };
}
const aList = create();
export { aList };
