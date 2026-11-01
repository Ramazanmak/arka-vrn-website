// Считаем только полностью заполненные поддоны одного изделия и исполнения.
// Остатки и изделия без нормы укладки комплектует оператор.
export function getPalletPlan(materials) {
    if (!Array.isArray(materials)) {
        throw new Error("Не передан список изделий для расчёта поддонов");
    }

    const products = new Map();

    for (const [index, material] of materials.entries()) {
        const block = material?.block;
        const count = material?.count;

        if (!block || typeof block !== "object") {
            throw new Error("Не указано изделие для расчёта поддонов");
        }

        if (!Number.isSafeInteger(count) || count < 0) {
            throw new Error(
                `Неверное количество изделий: ${block.name || material.label || "без названия"}`
            );
        }

        if (count === 0) {
            continue;
        }

        const productId = block.id ?? material.key ?? index;
        const finishId = block.finishId ?? block.finishName ?? block.color ?? null;
        const key = JSON.stringify([productId, finishId]);
        const palletQuantity = Number.isSafeInteger(block.palletQuantity)
            && block.palletQuantity > 0
            ? block.palletQuantity
            : null;

        const existing = products.get(key);

        if (existing) {
            existing.count += count;

            if (!Number.isSafeInteger(existing.count)) {
                throw new Error("Слишком большое количество изделий для расчёта поддонов");
            }

            // Противоречивые нормы укладки не используем автоматически.
            if (existing.palletQuantity !== palletQuantity) {
                existing.palletQuantity = null;
            }
        } else {
            products.set(key, {
                key,
                productId,
                finishId,
                name: block.name || material.label || "Изделие",
                finishName: block.finishName || "",
                count,
                palletQuantity,
            });
        }
    }

    const items = [...products.values()].map((item) => {
        const fullPalletsCount = item.palletQuantity
            ? Math.floor(item.count / item.palletQuantity)
            : 0;

        const unpackedCount = item.palletQuantity
            ? item.count % item.palletQuantity
            : item.count;

        return {
            ...item,
            fullPalletsCount,
            unpackedCount,
            palletQuantityNeedsConfirmation: item.palletQuantity === null,
        };
    });

    return {
        totalFullPallets: items.reduce(
            (total, item) => total + item.fullPalletsCount,
            0
        ),
        totalUnpackedItems: items.reduce(
            (total, item) => total + item.unpackedCount,
            0
        ),
        items,
        unpackedItems: items.filter((item) => item.unpackedCount > 0),
    };
}
