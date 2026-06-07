import { FiMinus, FiPlus } from 'react-icons/fi';
import type { CartItem as CartItemModel } from '../data/mockData';

type CartItemProps = {
	item: CartItemModel;
};

function CartItem({ item }: CartItemProps) {
	const { product, quantity } = item;

	return (
		<article className="flex gap-4 pb-4" aria-label={product.name}>
			<img src={product.image} alt={product.name} className="h-[144px] w-[110px] object-cover"/>

			<div className="flex min-w-95 flex-1 flex-col justify-between">
				<div>
					<h3 className="text-[16px] font-semibold leading-4 text-(--color-text-primary)">{product.name}</h3>
					<p className="text-[14px] font-medium leading-6 text-(--color-text-primary)">
						{product.size} | {product.color}
					</p>
					<span className="inline-flex bg-(--color-primary-green-soft) px-1 text-[14px] font-medium leading-6 text-(--color-text-primary)">
						I lager
					</span>
				</div>

				<div className="flex items-end justify-between">
					<div className="overflow-hidden rounded-md">
						<div className="flex h-8 items-stretch">
							<button
								type="button"
								aria-label="Minska antal"
								className="flex w-8 items-center justify-center bg-(--color-quantity-toggle) text-(--color-button-text) transition-opacity hover:opacity-90"
							>
								<FiMinus size={18} />
							</button>
							<span className="flex w-15 items-center justify-center bg-(--color-primary-green-soft) text-[16px] font-semibold leading-none text-(--color-quantity-value)">
								{quantity}
							</span>
							<button
								type="button"
								aria-label="Öka antal"
								className="flex w-8 items-center justify-center bg-(--color-quantity-toggle) text-(--color-button-text) transition-opacity hover:opacity-90"
							>
								<FiPlus size={18} />
							</button>
						</div>
					</div>

					<p className="text-[16px] font-bold leading-none text-(--color-text-primary)">{product.price} kr</p>
				</div>
			</div>
		</article>
	);
}

export default CartItem;