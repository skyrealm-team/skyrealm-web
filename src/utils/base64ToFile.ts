const base64ToFile = async (base64: string) => {
  const [data, type] = base64.match(/data:(image\/([^;]+));base64[^"]+/i) ?? [];
  if (data) {
    const res = await fetch(data);
    const blob = await res.blob();
    return new File([blob], `${Date.now()}`, { type });
  } else {
    return Promise.reject();
  }
};

export default base64ToFile;
