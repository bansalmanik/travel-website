export type EnabledEntity = {
  enabled?: boolean;
};

export function isEntityEnabled<T extends EnabledEntity>(item: T | null | undefined): item is T {
  if (!item) {
    return false;
  }

  return item.enabled ?? true;
}

export function filterEnabled<T>(items: readonly T[] | T[] | null | undefined): T[] {
  if (!items) {
    return [];
  }

  return items.filter((item) => {
    if (item && typeof item === "object") {
      return (item as EnabledEntity).enabled ?? true;
    }

    return true;
  });
}

export function filterEnabledDeep<T>(value: T): T {
  if (Array.isArray(value)) {
    const filteredItems = value.filter((item) => {
      if (item && typeof item === "object") {
        return (item as EnabledEntity).enabled ?? true;
      }

      return true;
    });

    return filteredItems.map((item) => filterEnabledDeep(item)) as unknown as T;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value).map(([key, nestedValue]) => [
      key,
      filterEnabledDeep(nestedValue),
    ]);

    return Object.fromEntries(entries) as T;
  }

  return value;
}
