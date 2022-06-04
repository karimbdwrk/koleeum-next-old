
export async function fetcher(url, options = {}) {
    let response;
    if (!options) {
      response = await fetch(url);
    } else {
      response = await fetch(url, options);
    }
    const data = await response.json();
    console.log('fetcher :', data)
    return data;
  }