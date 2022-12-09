export const toGlobalId = (id: string | number, type: string) => {
  return Buffer.from(`${type}:${id}`).toString('base64');
};

export function fromGlobalId(
  globalId: string,
  exceptedType: string = null,
): number {
  const parsed = Buffer.from(globalId, 'base64').toString();
  const [type, id] = parsed.split(':');

  if (exceptedType && exceptedType !== type) {
    throw new Error(`Excepted ${exceptedType} but global ID is ${type}`);
  }

  return parseInt(id);
}
