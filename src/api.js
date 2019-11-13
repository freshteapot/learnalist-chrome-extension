import { config, getAuth, getServer } from "./config.js";

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: getAuth()
  };
}
async function GetListsByLabel(label) {
  // TODO sanitise label for the query string
  const url = getServer() + "/alist/by/me?labels=" + label;
  const res = await fetch(url, {
    headers: getHeaders()
  });

  let manyLists = await res.json();
  if (res.ok) {
    return manyLists;
  } else {
    throw new Error("Boom");
  }
}

async function GetLabelsByMe() {
  const url = getServer() + "/labels/by/me";
  const res = await fetch(url, {
    headers: getHeaders()
  });

  let items = await res.json();
  if (res.ok) {
    return items;
  } else {
    throw new Error("Boom");
  }
}

async function GetListsByMe() {
  const url = getServer() + "/alist/by/me";
  const res = await fetch(url, {
    headers: getHeaders()
  });

  let manyLists = await res.json();
  if (res.ok) {
    return manyLists;
  } else {
    throw new Error("Boom");
  }
}
async function GetVersion() {
  const url = getServer() + "/version";
  const res = await fetch(url, {
    headers: getHeaders()
  });
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw new Error("Boom");
  }
}

async function PostList(aList) {
  const url = getServer() + "/alist";
  let input = aList;

  const res = await fetch(url, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(input)
  });

  const data = await res.json();
  // TODO double check we handle the codes we send from the server.
  if (res.status === 400 || res.status === 201) {
    return {
      status: res.status,
      body: data
    };
  } else {
    debugger;
    throw new Error("Boom");
  }
}

async function PutList(aList) {
  const url = getServer() + "/alist/" + aList.uuid;
  let input = aList;

  const res = await fetch(url, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(input)
  });

  const data = await res.json();
  // TODO double check we handle the codes we send from the server.
  if (res.status === 400 || res.status === 200) {
    return {
      status: res.status,
      body: data
    };
  } else {
    debugger;
    throw new Error("Boom");
  }
}

async function DeleteList(aList) {
  const url = getServer() + "/alist/" + aList.uuid;
  const res = await fetch(url, {
    method: "DELETE",
    headers: getHeaders()
  });

  const data = await res.json();
  // TODO double check we handle the codes we send from the server.
  if (res.status === 400 || res.status === 200 || res.status === 404) {
    return {
      status: res.status,
      body: data
    };
  } else {
    debugger;
    throw new Error("Boom");
  }
}

async function PostLabel(label) {
  const url = getServer() + "/labels";
  let input = label;

  const res = await fetch(url, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(input)
  });

  const data = await res.json();
  // TODO double check we handle the codes we send from the server.
  if (res.status === 400 || res.status === 200 || res.status === 201) {
    return {
      status: res.status,
      body: data
    };
  } else {
    debugger;
    throw new Error("Boom");
  }
}

async function DeleteLabel(label) {
  const url = getServer() + "/labels/" + label;

  const res = await fetch(url, {
    method: "DELETE",
    headers: getHeaders()
  });

  const data = await res.json();
  // TODO double check we handle the codes we send from the server.
  if (res.status === 400 || res.status === 200 || res.status === 404) {
    return {
      status: res.status,
      body: data
    };
  } else {
    debugger;
    throw new Error("Boom");
  }
}


export let api = {
  GetVersion: GetVersion,
  GetListsByMe: GetListsByMe,
  GetLabelsByMe: GetLabelsByMe,
  GetListsByLabel: GetListsByLabel,
  PostList: PostList,
  PutList: PutList,
  DeleteList: DeleteList,
  DeleteLabel: DeleteLabel,
  PostLabel: PostLabel
};
