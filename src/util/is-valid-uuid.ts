export const isValidUUIDv4 = (uuid: string) => {
  // check id is uuid v4
  const regexExp = new RegExp(
    "/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i"
  );
  return regexExp.test(uuid);
};
