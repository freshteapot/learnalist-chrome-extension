import { writable } from "svelte/store";
import { api } from "../api.js";

function create() {
  const { subscribe, set, update } = writable();

  return {
    subscribe,
    set,
    delete: async function() {
      let current;
      update(label => {
        current = label;
        return label;
      });

      try {
        let response = await api.DeleteLabel(current);
        if (response.status === 200) {
          set();
          localStorage.removeItem("label");
          return response;
        } else {
          return response;
        }
      } catch(error) {
        console.log(error);
        return {
          status: "clientfail",
          body: {
            message: "Failed to delete from the server."
          }
        };
      }

    },
    save: async function(newLabel) {
      update(label => {
        return newLabel;
      });

      try {
        let response = await api.PostLabel({label: newLabel});
        if (response.status === 200 || response.status === 201) {
          update(function(label) {
            label = response.body;
            return label;
          });
          localStorage.setItem("label", newLabel);
          localStorage.setItem("labels", response.body);
          return {
            status: response.status,
            body:{
              message: "Saved to the server."
            }
          };
        } else {
          return response;
        }
      } catch(error) {
        console.log(error);
        return "Failed to save to the server.";
      }
    }
  };
}
const label = create()
export {label};
