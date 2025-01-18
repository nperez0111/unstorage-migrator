import { describe, expect, it, vi } from "vitest";
import { createStorage } from "unstorage";

import { migrate } from "./migrator.js";

describe("migrator", () => {
	it("can migrate a single key", async () => {
		const storage = createStorage();
		const from = "old";
		const to = "new";
		await storage.setItem("old:foo", "bar");
		for await (const expected of migrate({ storage, from, to })) {
			expect(expected).toEqual({
				fromKey: "old:foo",
				toKey: "new:foo",
				value: "bar",
				index: 1,
				total: 1,
			});
		}
	});

	it("can migrate a many keys", async () => {
		const storage = createStorage();
		const from = "old";
		const to = "new";

		await storage.setItem("old:foo", "bar");
		await storage.setItem("old:bar", "baz");
		await storage.setItem("old:baz", "foo");

		const expected = [
			{
				fromKey: "old:foo",
				toKey: "new:foo",
				value: "bar",
				index: 1,
				total: 3,
			},
			{
				fromKey: "old:bar",
				toKey: "new:bar",
				value: "baz",
				index: 2,
				total: 3,
			},
			{
				fromKey: "old:baz",
				toKey: "new:baz",
				value: "foo",
				index: 3,
				total: 3,
			},
		];

		const actual = [];
		for await (const value of migrate({ storage, from, to })) {
			actual.push(value);
		}

		expect(actual).toEqual(expected);
	});

	it("can migrate a many keys with meta", async () => {
		const storage = createStorage();
		const from = "old";
		const to = "new";

		await storage.setItem("old:foo", "bar");
		await storage.setMeta("old:foo", { foo: "bar" });
		await storage.setItem("old:bar", "baz");
		await storage.setMeta("old:bar", { bar: "baz" });
		await storage.setItem("old:baz", "foo");
		await storage.setMeta("old:baz", { baz: "foo" });

		const expected = [
			{
				fromKey: "old:foo",
				toKey: "new:foo",
				value: "bar",
				meta: { foo: "bar" },
				index: 1,
				total: 3,
			},
			{
				fromKey: "old:bar",
				toKey: "new:bar",
				value: "baz",
				meta: { bar: "baz" },
				index: 2,
				total: 3,
			},
			{
				fromKey: "old:baz",
				toKey: "new:baz",
				value: "foo",
				meta: { baz: "foo" },
				index: 3,
				total: 3,
			},
		];

		const actual = [];
		for await (const value of migrate({
			storage,
			from,
			to,
			includeMeta: true,
		})) {
			actual.push(value);
		}

		expect(actual).toEqual(expected);
	});

	it("can migrate a many keys with custom getKeys", async () => {
		const storage = createStorage();
		const from = "old";
		const to = "new";

		await storage.setItem("old:foo", "bar");
		await storage.setItem("old:bar", "baz");
		await storage.setItem("old:baz", "foo");

		const expected = [
			{
				fromKey: "old:foo",
				toKey: "new:foo",
				value: "bar",
				index: 1,
				total: 2,
			},
			{
				fromKey: "old:bar",
				toKey: "new:bar",
				value: "baz",
				index: 2,
				total: 2,
			},
		];

		const actual = [];
		for await (const value of migrate({
			storage,
			from,
			to,
			getKeys: async () => ["old:foo", "old:bar"],
		})) {
			actual.push(value);
		}

		expect(actual).toEqual(expected);
	});

	it("can migrate a many keys with custom getKeys and meta", async () => {
		const storage = createStorage();
		const from = "old";
		const to = "new";

		await storage.setItem("old:foo", "bar");
		await storage.setMeta("old:foo", { foo: "bar" });
		await storage.setItem("old:bar", "baz");
		await storage.setMeta("old:bar", { bar: "baz" });
		await storage.setItem("old:baz", "foo");
		await storage.setMeta("old:baz", { baz: "foo" });

		const expected = [
			{
				fromKey: "old:foo",
				toKey: "new:foo",
				value: "bar",
				meta: { foo: "bar" },
				index: 1,
				total: 2,
			},
			{
				fromKey: "old:bar",
				toKey: "new:bar",
				value: "baz",
				meta: { bar: "baz" },
				index: 2,
				total: 2,
			},
		];

		const actual = [];
		for await (const value of migrate({
			storage,
			from,
			to,
			includeMeta: true,
			getKeys: async () => ["old:foo", "old:bar"],
		})) {
			actual.push(value);
		}

		expect(actual).toEqual(expected);
	});
});
