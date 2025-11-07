import { type FieldType } from "../data";
export function isStepValid(
  fields: FieldType[],
  userData: Record<string, string>
): boolean {
  return fields.every(
    (f) => !f.required || (userData[f.name]?.trim()?.length ?? 0) > 0
  );
}
