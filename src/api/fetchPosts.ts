const fetchPost = (sl_token: string, page: number) =>
  new Promise<any>((resolve, reject) => {
    fetch(
      `https://api.supermetrics.com/assignment/posts?sl_token=${encodeURIComponent(sl_token)}&page=${encodeURIComponent(
        page
      )}`
    )
      .then(async (response) => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && (await response.json());

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          reject(error);
        }

        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default fetchPost;
