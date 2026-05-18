import type { Category, CreateCategoryDTO } from '@spendingsystem/shared';
import { useEffect, useState } from 'react';

function useCategory() {
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    fetch(import.meta.env.VITE_CATEGORIES_URL)
      .then((res) => res.json())
      .then((data: Category[]) => {
        setCategories(data);
      });
  }, []);

  const addCategory = async (category: CreateCategoryDTO) => {
    const res = await fetch(import.meta.env.VITE_CATEGORIES_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    if (res.ok) {
      const data = await res.json();
      setCategories((prev) => [data, ...prev]);
    }
  };

  const removeCategory = async (category_id: number) => {
    const res = await fetch(
      import.meta.env.VITE_CATEGORIES_URL + '/' + category_id.toString(),
      {
        method: 'DELETE',
      },
    );
    if (res.ok) {
      setCategories((prev) => prev.filter((c) => c.id != category_id));
    }
  };

  return { categories, addCategory, removeCategory };
}

export default useCategory;

