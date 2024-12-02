const API_URL = "http://localhost:5000/api/books/pending-books";

export const fetchPendingBooks = async () => {
  //   const response = await fetch("/api/pending-books");

  const response = await fetch(`${API_URL}`);
  return response.json();
};

export const approveBook = async (bookId: number) => {
  //   const response = await fetch(`/api/pending-books/${bookId}/approve`,
  const response = await fetch(`${API_URL}/${bookId}/approve`, {
    method: "POST",
  });
  return response.json();
};

export const rejectBook = async (bookId: number) => {
  const response = await fetch(`${API_URL}/${bookId}/reject`, {
    method: "DELETE",
  });
  return response.json();
};
