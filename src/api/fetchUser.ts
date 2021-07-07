const fetchUser = (name: string, email: string) => {
  const reqOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: 'ju16a6m81mhid5ue1z3v2g0uh',
      email: email,
      name: name,
    }),
  };

  return new Promise<any>((resolve, reject) => {
    fetch('https://api.supermetrics.com/assignment/register', reqOptions)
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
};

export default fetchUser;
