const uploadFile = async (url: string, file: File) => {
  const res = await fetch(url, {
    method: "PUT",
    body: file,
  });

  return Promise.resolve(res.ok);
};

export default uploadFile;
