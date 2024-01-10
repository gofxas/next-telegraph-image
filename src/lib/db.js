import Dexie from "dexie";
export const db = new Dexie("telegraphImage");
db.version(1).stores({
  image: "++id, src, size, createAt", // Primary key and indexed props
});
