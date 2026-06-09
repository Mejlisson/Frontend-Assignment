import type { Product } from '../data/mockData';

type CrossSellModuleProps = {
	productId: number;
	products: Product[];
	onAdd: (productId: number) => void;
};

function CrossSellModule({ productId, products, onAdd }: CrossSellModuleProps) {
	const product = products.find((item) => item.id === productId);

	if (!product) {
		return null;
	}

	return (
		<article className="h-fit w-35 min-w-35 max-w-35 overflow-hidden rounded-sm bg-white p-3" aria-label={product.name}>
			<div className="flex justify-center bg-white">
				<img src={product.image} alt={product.name} className="h-45 w-auto object-cover" />
			</div>
			<p className="mt-2 w-full truncate text-[12px] font-medium leading-6 text-(--color-text-primary)">
				{product.name}
			</p>
			<p className="mt-1 text-[18px] font-bold leading-none text-(--color-text-primary)">
				{product.price} kr
			</p>
			<button
				type="button"
				onClick={() => onAdd(product.id)}
				className="mt-2 h-12 w-full rounded-sm bg-(--color-primary-green) text-[18px] font-medium leading-none text-(--color-button-text) transition-colors hover:bg-(--color-primary-green-dark)"
			>
				Add
			</button>
		</article>
	);
}

export default CrossSellModule;
