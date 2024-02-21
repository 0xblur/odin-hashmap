import { LinkedList, Node } from "./linkedlist.js";

// const ARR_LIMIT = index < 0 || index >= buckets.length;
const ARR_LIMIT_ERR = new Error("Trying to access index out of bound");

class HashMap {
	constructor(initialCapacity = 16) {
		this.length = 0;
		this.buckets = Array(initialCapacity);
	}

	/**
	 * @param {string} key
	 * @returns {number} The index of the bucket.
	 */
	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
			hashCode = hashCode % this.buckets.length;
		}
		return hashCode;
	}

	set(key, value) {
		const index = this.hash(key);
		const isEmpty = this.buckets[index] instanceof LinkedList ? false : true;
		const noNodes = this.buckets[index]?.size === 0;
		if (this.has(key)) {
			// Then update value
			const node = this.buckets[index].get(key);
			node.value = value;
		} else if (isEmpty) {
			const list = new LinkedList();
			list.append(key, value);
			this.buckets[index] = list;
			this.length++;
			this.checkLoadFactor();
		} else if (noNodes) {
			this.buckets[index].append(key, value);
			this.length++;
			this.checkLoadFactor();
		} else {
			const list = this.buckets[index];
			list.append(key, value);
			console.log(
				`A collision ocurred! LinkedList on index ${index} was increased in size to ${list.size}`,
			);
		}
	}

	checkLoadFactor() {
		const used = this.length;
		const available = this.buckets.length;
		const loadFactor = used / available;
		if (loadFactor >= 0.75) {
			const newLength = this.buckets.length * 2;
			this.buckets.length = newLength;
			const auxArr = Array(newLength);
			const newBuckets = Array(newLength);
			for (const bucket of this.buckets) {
				if (bucket !== undefined) {
					const newIndex = this.hash(bucket.head.key);
					auxArr[newIndex] = bucket;
				}
			}
			for (const bucket of auxArr) {
				if (bucket) {
					newBuckets.push(bucket);
				}
			}
			this.buckets = newBuckets;
			console.log(`Buckets increased to ${newLength}`);
		} else {
			console.log(`Load factor: ${loadFactor}`);
		}
	}

	has(key) {
		const index = this.hash(key);
		const isEmpty = this.buckets[index] instanceof LinkedList ? false : true;
		if (isEmpty) {
			return false;
		} else {
			const keysMatch = this.buckets[index].contains(key);
			if (keysMatch) {
				return true;
			} else {
				return false;
			}
		}
	}

	get(key) {
		if (this.has(key)) {
			const index = this.hash(key);
			const node = this.buckets[index].get(key);
			return node.value;
		} else {
			return null;
		}
	}

	remove(key) {
		if (this.has(key)) {
			const bucketIndex = this.hash(key);
			const nodeIndex = this.buckets[bucketIndex].find(key);
			this.buckets[bucketIndex].removeAt(nodeIndex);
			if (this.buckets[bucketIndex].size === 0) {
				// this.buckets[bucketIndex] = undefined;
				this.length--;
			}
			return true;
		} else {
			return false;
		}
	}

	clear() {
		this.buckets.length = 16;
		this.buckets.fill(undefined);
		this.length = 0;
	}

	keys() {
		const keys = [];
		for (const bucket of this.buckets) {
			if (bucket !== undefined && bucket.head !== null) {
				let currentNode = bucket.head;
				do {
					keys.push(currentNode.key);
					currentNode = currentNode.next;
				} while (currentNode !== null);
			}
		}
		return keys;
	}

	values() {
		const values = [];
		for (const bucket of this.buckets) {
			if (bucket !== undefined && bucket.head !== null) {
				let currentNode = bucket.head;
				do {
					values.push(currentNode.value);
					currentNode = currentNode.next;
				} while (currentNode !== null);
			}
		}
		return values;
	}

	entries() {
		const entries = [];
		for (const bucket of this.buckets) {
			if (bucket !== undefined && bucket.head !== null) {
				let currentNode = bucket.head;
				do {
					entries.push([currentNode.key, currentNode.value]);
					currentNode = currentNode.next;
				} while (currentNode !== null);
			}
		}
		return entries;
	}
}

export { HashMap };
