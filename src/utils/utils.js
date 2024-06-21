const fetchNewBoardData = async (newBoard) => {
    const API_ENDPOINT = 'http://localhost:5000/boards';
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBoard),
    });
    const data = await response.json();
    return data;
  };


export { fetchNewBoardData }
