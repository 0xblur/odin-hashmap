import { HashMap } from "./hashmap.js";

const h = new HashMap();
const testData = {
	Ramiro: 23,
	Giacomo: 23,
	Janine: 23,
	Luana: 9,
	Valentina: 8,
	"Juan Carlos": 35,
	Daniel: 29,
	Milushka: 49,
	Lady: 52,
	Gisella: 50,
	Karina: 55,
	Lamberto: 55,
	Piero: 24,
	Mia: 7,
	Alejandro: 23,
	Romina: 14,
	Marcelo: 17,
	Optimus: "Prime",
	Freud: 78,
};
for (const [key, value] of Object.entries(testData)) {
	h.set(key, value);
}

console.log(h.has("Freud"));
console.log(h.length);

(function removeFreud() {
	h.remove("Freud");
	console.log("Freud has been removed");
})();

console.log(h.has("Freud"));
console.log(h.length);

// h.clear();
// console.log(h.buckets);

console.log(h.keys());

console.log(h.values());

console.log(h.entries());
