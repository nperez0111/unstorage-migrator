import { type Storage } from "unstorage";

/**
 * Migrate data from one key prefix to another.
 */
export async function* migrate({
	storage,
	from,
	to,
	includeMeta = false,
	getKeys = async () => {
		const keys = await storage.getKeys(from);
		return keys;
	},
}: {
	/**
	 * The storage instance
	 */
	storage: Storage;

	/**
	 * The key prefix to migrate from.
	 */
	from: string;
	/**
	 * The key prefix to migrate to.
	 */
	to: string;
	/**
	 * Include meta data in the migration.
	 */
	includeMeta?: boolean;
	/**
	 * The keys to migrate.
	 * @default All keys in `from`.
	 */
	getKeys?: () => Promise<string[]>;
}) {
	const keys = await getKeys();
	const total = keys.length;
	let index = 0;

	for (const fromKey of keys) {
		index++;
		const toKey = to + fromKey.slice(from.length);
		const value = await storage.get(fromKey);
		await storage.setItem(toKey, value);
		if (!includeMeta) {
			yield { fromKey, toKey, value, index, total };
			continue;
		}
		const meta = await storage.getMeta(fromKey);
		await storage.setMeta(toKey, meta);
		yield { fromKey, toKey, value, meta, index, total };
	}
}
