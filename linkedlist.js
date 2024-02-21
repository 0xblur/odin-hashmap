class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	append(key, value) {
		if (this.head === null) {
			this.prepend(key, value);
		} else {
			const node = new Node(key, value);
			//Append node to previous tail
			this.tail.next = node;
			//Set node as current tail
			this.tail = node;
			this.size++;
		}
	}

	prepend(key, value) {
		const node = new Node(key, value, this.head);
		this.head = node;
		if (this.tail === null) {
			this.tail = node;
		}
		this.size++;
	}

	at(index) {
		let current = this.head;
		for (let i = 1; i <= index; i++) {
			current = current.next;
		}
		return current;
	}

	removeAt(index) {
		if (this.size === 0) {
			this.head = null;
			this.tail = null;
		}
		if (index === 0) {
			this.head = this.head.next;
			this.size--;
		} else {
			let current = this.head;
			let previous;
			for (let i = 1; i <= index; i++) {
				previous = current;
				current = current.next;
			}
			previous.next = current.next;
			if (current.next === null) this.tail = previous;
			this.size--;
		}
	}

	insertAt(key, value, index) {
		if (index >= this.size) {
			this.append(key, value);
			return;
		}

		if (index <= 0) {
			this.prepend(key, value);
			return;
		}

		const node = new Node(key, value);
		let current = this.head;
		let previous;
		for (let i = 1; i <= index; i++) {
			previous = current;
			current = current.next;
		}
		if (current === null) {
			this.append(key, value);
		} else {
			previous.next = node;
			node.next = current;
			this.size++;
		}
	}

	pop() {
		let current = this.head;
		while (current !== null) {
			if (current.next.next === null) {
				current.next = null;
				this.tail = current;
				break;
			}
			current = current.next;
		}
		this.size--;
	}

	contains(key) {
		let current = this.head;
		while (current !== null) {
			if (current.key === key) {
				return true;
			}
			current = current.next;
		}
		return false;
	}

	get(key) {
		const current = this.head;
		while (current !== null) {
			if (current.key === key) {
				return current;
			} else {
				return null;
			}
		}
	}

	/**
	 * @returns {number} index
	 */
	find(key) {
		let current = this.head;
		let counter = 0;
		while (current !== null) {
			if (current.key === key) {
				return counter;
			}
			current = current.next;
			counter++;
		}
		return null;
	}

	//TODO: Needs modification for key-value pair Node
	toString() {
		let current = this.head;
		const arr = [];
		while (current !== null) {
			const str = `(${current.value}) -> `;
			arr.push(str);
			current = current.next;
		}
		arr.push("null");
		console.log(...arr);
	}
}

class Node {
	constructor(key, value = null, next = null) {
		this.key = key;
		this.value = value;
		this.next = next;
	}
}

export { LinkedList, Node };
